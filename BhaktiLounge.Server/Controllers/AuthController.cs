using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BhaktiLounge.Server.Data;
using BhaktiLounge.Server.Models.Accounts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace BhaktiLounge.Server.Controllers;

[Route("api/v1/[controller]")]
[ApiController]
public class AuthController : ControllerBase {
    private readonly ApplicationDbContext _context;
    private readonly IConfiguration _configuration;
    private readonly UserManager<Admin> _userManager;

    public AuthController(ApplicationDbContext context, IConfiguration configuration, UserManager<Admin> userManager) {
        _context = context;
        _configuration = configuration;
        _userManager = userManager;
    }

    [Authorize(Roles = "Manager")]
    [HttpGet("user-list")]
    public async Task<IActionResult> GetUserList() {
        var users = await (from user in _context.Users
                           join userRole in _context.UserRoles on user.Id equals userRole.UserId
                           join role in _context.Roles on userRole.RoleId equals role.Id
                           select new {
                               Id = user.Id,
                               Name = user.UserName,
                               Role = role.Name
                           }).ToListAsync();
        return Ok(users);
    }

    [Authorize(Roles = "Manager")]
    [HttpPost("signup")]
    public async Task<IActionResult> Signup([FromBody] SignupModel userModel) {
        var user = new Admin()
        {
            UserName = userModel.UserName,
        };
        var resultCreateUser = await _userManager.CreateAsync(user, userModel.Password);

        if (resultCreateUser.Succeeded) {
            var resultAddRole = await _userManager.AddToRoleAsync(user, userModel.Role);
            if (resultAddRole.Succeeded) {
                return Ok(new { message = "User registered successfully" });
            }
        }

        return BadRequest(resultCreateUser.Errors);
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginModel userModel) {
        // Find the user by username
        var user = await _userManager.FindByNameAsync(userModel.UserName);
        if (user == null)
            return Unauthorized("Invalid Credentials");

        // Check if the password is correct
        var passwordValid = await _userManager.CheckPasswordAsync(user, userModel.Password);
        if (!passwordValid)
            return Unauthorized("Invalid Credentials");

        var roles = await _userManager.GetRolesAsync(user);
        var claims = new List<Claim>
        {
            new(ClaimTypes.Name, user.UserName),
            new(ClaimTypes.NameIdentifier, user.Id),
        };
        foreach (var role in roles) {
            claims.Add(new Claim(ClaimTypes.Role, role));
        }
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
        var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: claims,
            expires: DateTime.Now.AddDays(1),
            signingCredentials: cred
        );

        return Ok(new {
            userName = user.UserName,
            userRole = roles[0],
            token = new JwtSecurityTokenHandler().WriteToken(token)
        });
    }

    [Authorize(Roles = "Manager")]
    [HttpPost("delete")]
    public async Task<IActionResult> Delete([FromBody] UserModel userModel) {
        var user = await _userManager.FindByNameAsync(userModel.UserName);
        if (user == null)
            return NotFound("No this user found!");

        var result = await _userManager.DeleteAsync(user);
        if (result.Succeeded) {
            return Ok("User deleted successfully");
        }
        return BadRequest(result.Errors);
    }
}
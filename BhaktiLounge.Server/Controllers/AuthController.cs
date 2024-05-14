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
public class AuthController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly IConfiguration _configuration;
    private readonly UserManager<Admin> _userManager;

    public AuthController(ApplicationDbContext context, IConfiguration configuration, UserManager<Admin> userManager)
    {
        _context = context;
        _configuration = configuration;
        _userManager = userManager;
    }

    [HttpPost("signup")]
    public async Task<IActionResult> Signup([FromBody] SignupModel userModel)
    {
        var user = new Admin()
        {
            UserName = userModel.UserName,
            FirstName = userModel.FirstName,
            LastName = userModel.LastName,
            Email = userModel.Email
        };
        var resultCreateUser = await _userManager.CreateAsync(user, userModel.Password);

        if (resultCreateUser.Succeeded )
        {
            var resultAddRole = await _userManager.AddToRoleAsync(user, "Manager");
            if (resultAddRole.Succeeded)
            {
                return Ok(new { message = "User registered successfully" });
            }
        }

        return BadRequest(resultCreateUser.Errors);
    }

    [HttpPost("signin")]
    public async Task<IActionResult> Signin([FromBody] UserModel userModel)
    {
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
        foreach (var role in roles)
        {
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

        return Ok(new
        {
            username = user.UserName,
            token = new JwtSecurityTokenHandler().WriteToken(token)
        });
    }

}
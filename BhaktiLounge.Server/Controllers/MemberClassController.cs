using BhaktiLounge.Server.Data;
using BhaktiLounge.Server.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BhaktiLounge.Server.Controllers {

    [Authorize]
    [Route("api/v1/[controller]")]
    [ApiController]
    public class MemberClassController : ControllerBase {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<SubscribeController> _logger;

        public MemberClassController(ApplicationDbContext context, ILogger<SubscribeController> logger) {
            _context = context;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllMemberClass() {
            try {
                var memberClasses = await _context.MemberClass.OrderBy(m => m.Name).ToArrayAsync();
                return Ok(memberClasses);
            } catch (Exception ex) {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [Authorize(Roles = "Manager")]
        [HttpPost]
        public async Task<ActionResult> AddMemberClass([FromBody] MemberClass? newItem) {
            try {
                newItem ??= new MemberClass();
                _context.MemberClass.Add(newItem);
                await _context.SaveChangesAsync();
                return Ok(newItem);
            } catch (Exception ex) {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [Authorize(Roles = "Manager")]
        [HttpPut]
        public async Task<ActionResult> UpdateMemberClass([FromBody] MemberClass updated) {
            try {
                var target = await _context.MemberClass.FindAsync(updated.Id);
                if (target is null) {
                    return NotFound("Item Not Found");
                }
                target.Name = updated.Name;
                target.Price = updated.Price;
                target.Duration = updated.Duration;
                target.Pass = updated.Pass;
                _context.MemberClass.Update(target);
                await _context.SaveChangesAsync();
                return Ok(target);
            } catch (Exception ex) {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [Authorize(Roles = "Manager")]
        [HttpDelete]
        public async Task<ActionResult> DeleteMemberClass(int Id) {
            try {
                var toDel = await _context.MemberClass.FindAsync(Id);
                if (toDel is null) {
                    return NotFound("Item Not Found");
                }
                _context.MemberClass.Remove(toDel);
                await _context.SaveChangesAsync();
                return Ok("Item Deleted");
            } catch (Exception ex) {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
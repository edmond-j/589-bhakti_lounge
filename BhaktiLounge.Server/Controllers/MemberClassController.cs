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
            var memberClasses = await _context.MemberClass.OrderBy(m => m.Name).ToArrayAsync();
            return Ok(memberClasses);
        }
        [Authorize (Roles = "Manager")]
        [HttpPost]
        public async Task<ActionResult> AddMemberClass([FromBody] MemberClass? newItem) {
            newItem ??= new MemberClass();
            _context.MemberClass.Add(newItem);
            await _context.SaveChangesAsync();
            return Ok(newItem);
        }
        [Authorize (Roles = "Manager")]
        [HttpPut]
        public async Task<ActionResult> UpdateMemberClass([FromBody] MemberClass updated) {
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
        }
        [Authorize (Roles = "Manager")]
        [HttpDelete]
        public async Task<ActionResult> DeleteMemberClass(int Id) {
            var toDel = await _context.MemberClass.FindAsync(Id);
            if (toDel is null) {
                return NotFound("Item Not Found");
            }
            _context.MemberClass.Remove(toDel);
            await _context.SaveChangesAsync();
            return Ok("Item Deleted");
        }
    }
}
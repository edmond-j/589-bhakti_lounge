using BhaktiLounge.Server.Data;
using BhaktiLounge.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BhaktiLounge.Server.Controllers {

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

        [HttpPost]
        public async Task<ActionResult> AddMemberClass([FromBody] MemberClass? newMemberClass) {
            newMemberClass ??= new MemberClass();
            _context.MemberClass.Add(newMemberClass);
            await _context.SaveChangesAsync();
            return Ok(newMemberClass);
        }

        [HttpPut]
        public async Task<ActionResult> UpdateMemberClass([FromBody] MemberClass memberClass) {
            var updatedMemberClass = await _context.MemberClass.FindAsync(memberClass.Id);
            if (updatedMemberClass is null) {
                return NotFound("Item Not Found");
            }
            updatedMemberClass.Name = memberClass.Name;
            updatedMemberClass.Price = memberClass.Price;
            updatedMemberClass.Duration = memberClass.Duration;
            updatedMemberClass.Pass = memberClass.Pass;
            _context.MemberClass.Update(updatedMemberClass);
            await _context.SaveChangesAsync();
            return Ok(updatedMemberClass);
        }

        [HttpDelete]
        public async Task<ActionResult> DeleteMemberClass(int Id) {
            var memberClass = await _context.MemberClass.FindAsync(Id);
            if (memberClass is null) {
                return NotFound("Item Not Found");
            }
            _context.MemberClass.Remove(memberClass);
            await _context.SaveChangesAsync();
            return Ok("Item Deleted");
        }
    }
}
using BhaktiLounge.Server.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BhaktiLounge.Server.Controllers {

    [Route("api/[controller]")]
    [ApiController]
    public class CompDataController : ControllerBase {
        private readonly ApplicationDbContext _context;

        public CompDataController(ApplicationDbContext context) {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Search(int customerId) {
            var customer = await _context.Customer.FindAsync(customerId);
            var activities = await _context.Activity
                                .Where(a => a.GetEndTime() > TimeOnly.FromDateTime(DateTime.Now) && ((a.DaysOfWeek == null) || a.DaysOfWeek.Contains(DateTime.Today.DayOfWeek)))
                                .ToListAsync();

            var events = await _context.Event
                                .Where(e => e.Date == DateOnly.FromDateTime(DateTime.Now))
                                .ToListAsync();
            //计算价格（在前端）

            var result = new {
                Activities = activities,
                Events = events,
            };

            return Ok(result);
        }
    }
}
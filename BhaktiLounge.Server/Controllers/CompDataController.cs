using BhaktiLounge.Server.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BhaktiLounge.Server.Controllers {

    [Route("api/v1/[controller]")]
    [ApiController]
    public class CompDataController : ControllerBase {
        private readonly ApplicationDbContext _context;

        public CompDataController(ApplicationDbContext context) {
            _context = context;
        }

        [HttpGet("CustomerOption")]
        public async Task<IActionResult> GetBusinessOption() {
            //var customer = await _context.Customer.FindAsync(customerId);
            var currentTime = TimeOnly.FromDateTime(DateTime.Now);
            var todayWeekDay = DateTime.Today.DayOfWeek;
            var todayDate = DateOnly.FromDateTime(DateTime.Now);
            var activities = await _context.Activity.ToListAsync();

            // 在内存中进行过滤
            activities = activities
                .Where(a => a.GetEndTime() > currentTime &&
                            (a.DaysOfWeek == null || a.DaysOfWeek.Contains(todayWeekDay)))
                .ToList();
            //var activities = await _context.Activity
            //                    .Where(a => a.GetEndTime() > currentTime && ((a.DaysOfWeek == null) || a.DaysOfWeek.Contains(todayWeekDay)))
            //                    .ToListAsync();
            var events = await _context.Event
                                .Where(e => e.Date == todayDate)
                                .ToListAsync();
            Console.WriteLine(DateOnly.FromDateTime(DateTime.Now));
            //计算价格（在前端）

            var result = new {
                Activities = activities,
                Events = events,
            };
            return Ok(result);
        }

        [HttpGet("Acquisition")]
        public async Task<IActionResult> GetAcquisition() {
            var allAcqu = await _context.Acquisition.OrderBy(a => a.Id).ToArrayAsync();
            return Ok(allAcqu);
        }
    }
}
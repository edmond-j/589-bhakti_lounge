using BhaktiLounge.Server.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BhaktiLounge.Server.Controllers {
    [Authorize]
    [Route("api/v1/[controller]")]
    [ApiController]
    public class CompDataController : ControllerBase {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<ActivityController> _logger;

        public CompDataController(ApplicationDbContext context, ILogger<ActivityController> logger) {
            _context = context;
            _logger = logger;
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

            var result = new {
                Activities = activities,
                Events = events,
            };
            return Ok(result);
        }
        
    }
}
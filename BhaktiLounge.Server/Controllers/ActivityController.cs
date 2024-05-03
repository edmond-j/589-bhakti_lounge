using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BhaktiLounge.Server.Models;
using BhaktiLounge.Server.Data;
using Microsoft.EntityFrameworkCore;

namespace BhaktiLounge.Server.Controllers {

    [Route("api/v1/[controller]")]
    [ApiController]
    public class ActivityController : ControllerBase {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<ActivityController> _logger;

        public ActivityController(ApplicationDbContext context, ILogger<ActivityController> logger) {
            _context = context;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult> GetAllActivity() {
            var activities = await _context.Activity.OrderBy(a => a.Id).ToArrayAsync();
            return Ok(activities);
        }

        [HttpPost]
        public async Task<ActionResult> AddActivity([FromBody] Activity newActivity) {
            newActivity ??= new Activity();
            _context.Activity.Add(newActivity);
            await _context.SaveChangesAsync();
            return Ok(newActivity);
        }

        [HttpPut]
        public async Task<ActionResult> UpdateActivity([FromBody] Activity newActivity) {
            var activity = await _context.Activity.FindAsync(newActivity.Id);
            if (activity is null) {
                return NotFound("Item Not Found");
            }
            activity.Name = newActivity.Name;
            activity.Price = newActivity.Price;
            activity.StartTime = newActivity.StartTime;
            activity.EndTime = newActivity.EndTime;
            activity.DaysOfWeek = newActivity.DaysOfWeek;
            activity.IncludeYoga = newActivity.IncludeYoga;
            activity.IncludeDinner = newActivity.IncludeDinner;
            _context.Activity.Update(activity);
            await _context.SaveChangesAsync();
            return Ok(activity);
        }

        [HttpDelete]
        public async Task<ActionResult> DeleteActivity(int Id) {
            var activitiy = await _context.Activity.FindAsync(Id);
            if (activitiy is null) {
                return NotFound("Item Not Found");
            }
            _context.Activity.Remove(activitiy);
            await _context.SaveChangesAsync();
            return Ok("Item Deleted");
        }
    }
}
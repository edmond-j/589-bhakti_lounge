using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BhaktiLounge.Server.Models;
using BhaktiLounge.Server.Data;
using Microsoft.EntityFrameworkCore;

namespace BhaktiLounge.Server.Controllers {

    [Route("[controller]")]
    [ApiController]
    public class ActivityController : ControllerBase {
        private readonly ApplicationDbContext _context;

        public ActivityController(ApplicationDbContext context) {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult> GetAllActivity() {
            //var activities = new List<Activity>();
            //activities.Add(new Activity { Id = 1, Price = 12, Type = "Workshop" });
            var activities = await _context.Activity.ToArrayAsync();
            return Ok(activities);
        }

        [HttpPost]
        public async Task<ActionResult> AddActivity([FromBody] Activity activity) {
            //Activity activity = new Activity { Id = 0, Type = "soulfeast", Price = 12, StartTime = new TimeOnly(18, 15), EndTime = new TimeOnly(0, 0), SoulFeast = true, DayOfWeek = 0 };
            _context.Activity.Add(activity);
            await _context.SaveChangesAsync();
            return Ok(await _context.Activity.ToListAsync());
        }

        [HttpPut]
        public async Task<ActionResult> UpdateActivity([FromBody] Activity updateActivity) {
            var activity = await _context.Activity.FindAsync(updateActivity.Id);
            if (activity is null) {
                return NotFound("Item Not Found");
            }
            activity.Name = updateActivity.Name;
            activity.Price = updateActivity.Price;
            activity.StartTime = updateActivity.StartTime;
            activity.EndTime = updateActivity.EndTime;
            activity.DaysOfWeek = updateActivity.DaysOfWeek;
            _context.Activity.Update(activity);
            await _context.SaveChangesAsync();
            return Ok(activity);
        }

        [HttpDelete]
        public async Task<ActionResult> DeleteActivity(int Id) {
            //Activity activity = new Activity { Id = 0, Type = "soulfeast", Price = 12, StartTime = new TimeOnly(18, 15), EndTime = new TimeOnly(0, 0), SoulFeast = true, DayOfWeek = 0 };
            var activities = await _context.Activity.FindAsync(Id);
            if (activities is null) {
                return NotFound("Item Not Found");
            }
            _context.Activity.Remove(activities);
            await _context.SaveChangesAsync();
            return Ok("Item Deleted");
        }
    }
}
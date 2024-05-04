using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BhaktiLounge.Server.Models;
using BhaktiLounge.Server.Data;
using BhaktiLounge.Server.Services;
using Microsoft.EntityFrameworkCore;

namespace BhaktiLounge.Server.Controllers {

    [Route("api/v1/[controller]")]
    [ApiController]
    public class ActivityController : ControllerBase {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<ActivityController> _logger;
        private readonly IActivityService _service;

        public ActivityController(ApplicationDbContext context, ILogger<ActivityController> logger, IActivityService service) {
            _context = context;
            _logger = logger;
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult> GetAllActivity() {
            var activities = await _service.GetAllActivity();
            return Ok(activities);
        }

        [HttpPost]
        public async Task<ActionResult> AddActivity([FromBody] Activity? newActivity) {
            if (newActivity == null) {
                return BadRequest("Activity data is required.");
            }
            return await _service.AddActivity(newActivity)? Ok(newActivity) : BadRequest("Failed to add activity.") ;
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
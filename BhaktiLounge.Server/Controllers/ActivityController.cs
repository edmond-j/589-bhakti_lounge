using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BhaktiLounge.Server.Models;
using BhaktiLounge.Server.Data;
using BhaktiLounge.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace BhaktiLounge.Server.Controllers {
    [Authorize (Roles = "Manager")]
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
        public async Task<ActionResult> AddActivity([FromBody] Activity? newItem) {
            if (newItem == null) {
                return BadRequest("Activity data is required.");
            }
            return await _service.AddActivity(newItem) ? Ok(newItem) : BadRequest("Failed to add activity.");
        }

        [HttpPut]
        public async Task<ActionResult> UpdateActivity([FromBody] Activity updated) {
            var target = await _context.Activity.FindAsync(updated.Id);
            if (target is null) {
                return NotFound("Item Not Found");
            }
            target.Name = updated.Name;
            target.Price = updated.Price;
            target.StartTime = updated.StartTime;
            target.EndTime = updated.EndTime;
            target.DaysOfWeek = updated.DaysOfWeek;
            target.IncludeYoga = updated.IncludeYoga;
            target.IncludeDinner = updated.IncludeDinner;
            _context.Activity.Update(target);
            await _context.SaveChangesAsync();
            return Ok(target);
        }

        [HttpDelete]
        public async Task<ActionResult> DeleteActivity(int Id) {
            var toDel = await _context.Activity.FindAsync(Id);
            if (toDel is null) {
                return NotFound("Item Not Found");
            }
            _context.Activity.Remove(toDel);
            await _context.SaveChangesAsync();
            return Ok("Item Deleted");
        }
    }
}
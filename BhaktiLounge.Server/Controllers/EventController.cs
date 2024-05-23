using Microsoft.AspNetCore.Mvc;
using BhaktiLounge.Server.Models;
using BhaktiLounge.Server.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace BhaktiLounge.Server.Controllers {

    [Authorize(Roles = "Manager")]
    [Route("api/v1/[controller]")]
    [ApiController]
    public class EventController : ControllerBase {
        private ApplicationDbContext _context;
        private readonly ILogger<ActivityController> _logger;

        public EventController(ApplicationDbContext context, ILogger<ActivityController> logger) {
            _context = context;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllEvents() {
            try {
                var events = await _context.Event.OrderBy(a => a.Id).ToListAsync();
                return Ok(events);
            } catch (Exception ex) {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult> AddEvent([FromBody] Event? newItem) {
            //if (newItem == null) {
            //    return BadRequest("Activity data is required.");
            //}
            //_context.Event.Add(newItem);
            //await _context.SaveChangesAsync();
            //return Ok(newItem);
            try {
                newItem ??= new Event();
                _context.Event.Add(newItem);
                await _context.SaveChangesAsync();
                return Ok(newItem);
            } catch (Exception ex) {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [Authorize]
        [HttpPut]
        public async Task<ActionResult> UpdateEvent([FromBody] Event updated) {
            try {
                var target = await _context.Event.FindAsync(updated.Id);
                if (target is null) {
                    return NotFound("Item Not Found");
                }
                target.Name = updated.Name;
                target.Price = updated.Price;
                target.Date = updated.Date;
                target.StartTime = updated.StartTime;
                target.EndTime = updated.EndTime;
                _context.Event.Update(target);
                await _context.SaveChangesAsync();
                return Ok(target);
            } catch (Exception ex) {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [Authorize]
        [HttpDelete]
        public async Task<ActionResult> DeleteEvent(int Id) {
            try {
                var toDel = await _context.Event.FindAsync(Id);
                if (toDel is null) {
                    return NotFound("Item Not Found");
                }
                _context.Event.Remove(toDel);
                await _context.SaveChangesAsync();
                return Ok("Item Deleted");
            } catch (Exception ex) {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
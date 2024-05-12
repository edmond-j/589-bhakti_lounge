using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BhaktiLounge.Server.Models;
using BhaktiLounge.Server.Data;
using Microsoft.EntityFrameworkCore;

namespace BhaktiLounge.Server.Controllers {

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
            //var events = new List<Event>();
            //events.Add(new Event { Id = 1, Name = "Yoga Nidia" });
            var events = await _context.Event.OrderBy(a => a.Id).ToListAsync();
            return Ok(events);
        }

        [HttpPost]
        public async Task<ActionResult> AddEvent([FromBody] Event? newEvent) {
            //if (newEvent == null) {
            //    return BadRequest("Activity data is required.");
            //}
            //_context.Event.Add(newEvent);
            //await _context.SaveChangesAsync();
            //return Ok(newEvent);
            newEvent ??= new Event();
            _context.Event.Add(newEvent);
            await _context.SaveChangesAsync();
            return Ok(newEvent);
        }

        [HttpPut]
        public async Task<ActionResult> UpdateEvent([FromBody] Event updateEvent) {
            var updatedEvent = await _context.Event.FindAsync(updateEvent.Id);
            if (updatedEvent is null) {
                return NotFound("Item Not Found");
            }
            updatedEvent.Name = updateEvent.Name;
            updatedEvent.Price = updateEvent.Price;
            updatedEvent.Date = updateEvent.Date;
            updatedEvent.StartTime = updateEvent.StartTime;
            updatedEvent.EndTime = updateEvent.EndTime;
            _context.Event.Update(updatedEvent);
            await _context.SaveChangesAsync();
            return Ok(updatedEvent);
        }

        [HttpDelete]
        public async Task<ActionResult> DeleteEvent(int Id) {
            var oneEvent = await _context.Event.FindAsync(Id);
            if (oneEvent is null) {
                return NotFound("Item Not Found");
            }
            _context.Event.Remove(oneEvent);
            await _context.SaveChangesAsync();
            return Ok("Item Deleted");
        }
    }
}
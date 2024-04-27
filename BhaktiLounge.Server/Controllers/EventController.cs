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

        public EventController(ApplicationDbContext context) {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllEvents() {
            //var events = new List<Event>();
            //events.Add(new Event { Id = 1, Name = "Yoga Nidia" });
            var events = await _context.Event.OrderBy(a => a.Id).ToListAsync();
            return Ok(events);
        }

        [HttpPost]
        public async Task<ActionResult> AddEvent([FromBody] Event newEvent) {
            _context.Event.Add(newEvent);
            await _context.SaveChangesAsync();
            return Ok(await _context.Event.ToListAsync());
        }

        [HttpPost("CreateDefault")]
        public async Task<ActionResult> AddDefaultEvent() {
            var newEvent = new Event();
            _context.Event.Add(newEvent);
            await _context.SaveChangesAsync();
            return Ok(newEvent);
        }

        [HttpPut]
        public async Task<ActionResult> UpdateEvent([FromBody] Event updateEvent) {
            var oneEvent = await _context.Event.FindAsync(updateEvent.Id);
            if (oneEvent is null) {
                return NotFound("Item Not Found");
            }
            oneEvent.Name = updateEvent.Name;
            oneEvent.Price = updateEvent.Price;
            oneEvent.Date = updateEvent.Date;
            oneEvent.StartTime = updateEvent.StartTime;
            oneEvent.EndTime = updateEvent.EndTime;
            _context.Event.Update(oneEvent);
            await _context.SaveChangesAsync();
            return Ok(oneEvent);
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
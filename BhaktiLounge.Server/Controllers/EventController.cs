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
            var events = await _context.Event.ToListAsync();
            return Ok(events);
        }
    }
}
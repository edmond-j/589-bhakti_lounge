using BhaktiLounge.Server.Data;
using BhaktiLounge.Server.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BhaktiLounge.Server.Controllers {
    [Authorize]
    [Route("api/v1/[controller]")]
    [ApiController]
    public class AcquisitionController : ControllerBase {
        private readonly ApplicationDbContext _context;

        public AcquisitionController(ApplicationDbContext context) {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult> GetAllAcquisition() {
            var acquisition = await _context.Acquisition.OrderBy(a => a.Id).ToListAsync();
            return Ok(acquisition);
        }
        [Authorize (Roles = "Manager")]
        [HttpPost]
        public async Task<ActionResult> AddEvent([FromBody] Acquisition? newItem) {
            newItem ??= new Acquisition();
            _context.Acquisition.Add(newItem);
            await _context.SaveChangesAsync();
            return Ok(newItem);
        }
        [Authorize (Roles = "Manager")]
        [HttpPut]
        public async Task<ActionResult> UpdateAcquisition([FromBody] Acquisition updatedAcqu) {
            var target = await _context.Acquisition.FindAsync(updatedAcqu.Id);
            if (target is null) {
                return NotFound("Item Not Found");
            }
            target.Name = updatedAcqu.Name;
            _context.Acquisition.Update(target);
            await _context.SaveChangesAsync();
            return Ok(target);
        }
        [Authorize (Roles = "Manager")]
        [HttpDelete]
        public async Task<ActionResult> DeleteAcquisition(int Id) {
            var toDel = await _context.Acquisition.FindAsync(Id);
            if (toDel is null) {
                return NotFound("Item Not Found");
            }
            _context.Acquisition.Remove(toDel);
            await _context.SaveChangesAsync();
            return Ok("Item Deleted");
        }
    }
}
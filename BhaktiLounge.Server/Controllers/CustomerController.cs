using BhaktiLounge.Server.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BhaktiLounge.Server.Controllers {

    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase {
        private readonly ApplicationDbContext _context;

        public CustomerController(ApplicationDbContext context) {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Search(string name) {
            var lowName = name.ToLower();
            var customers = await _context.Customer
                                .Where(c => c.FirstName.ToLower().Contains(lowName) || c.LastName.ToLower().Contains(lowName))
                                .Take(8)
                                .OrderBy(c => c.LastName)
                                .ThenBy(c => c.FirstName)
                                .ToArrayAsync();
            return Ok(customers);
        }
    }
}
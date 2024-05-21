using BhaktiLounge.Server.Data;
using BhaktiLounge.Server.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BhaktiLounge.Server.Controllers {
    [Authorize]
    [Route("api/v1/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<ActivityController> _logger;

        public CustomerController(ApplicationDbContext context, ILogger<ActivityController> logger) {
            _context = context;
            _logger = logger;
        }

        //Search a target
        [HttpGet]
        public async Task<IActionResult> Search(string? name) {
            var lowName = name == null ? "" : name.ToLower();
            //var lowName = name.ToLower();
            var customers = await _context.Customer
                                .Where(c => c.FirstName.ToLower().Contains(lowName) || c.LastName.ToLower().Contains(lowName))
                                .Take(8)
                                .OrderBy(c => c.LastName)
                                .ThenBy(c => c.FirstName)
                                .ToArrayAsync();
            return Ok(customers);
        }

        [HttpGet]
        [Route("{customerId}")]
        public async Task<IActionResult> GetCustomer(int customerId)
        {
            var customer = await _context.Customer.SingleOrDefaultAsync(c=>c.Id == customerId);                  
            return Ok(customer);
        }

        //New Customer registration
        [HttpPost]
        public async Task<IActionResult> Register([FromBody] Customer newItem) {
            _context.Customer.Add(newItem);
            await _context.SaveChangesAsync();
            return Ok(newItem);
        }

        //Subscribe, extend membership or modify profile
        [HttpPut]
        public async Task<IActionResult> Modifiy([FromBody] Customer updated) {
            var target = await _context.Customer.FindAsync(updated.Id);
            if (target == null) {
                return NotFound("Item Not Found");
            }
            target.FirstName = updated.FirstName;
            target.LastName = updated.LastName;
            target.Email = updated.Email;
            target.SubStartDate = updated.SubStartDate;
            target.SubEndDate = updated.SubEndDate;
            target.PassRemain = updated.PassRemain;
            _context.Customer.Update(target);
            await _context.SaveChangesAsync();
            return Ok(target);
        }
    }
}
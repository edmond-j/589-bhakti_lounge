using BhaktiLounge.Server.Data;
using BhaktiLounge.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BhaktiLounge.Server.Controllers {

    [Route("api/v1/[controller]")]
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

        [HttpPost]
        public async Task<IActionResult> Register([FromBody] Customer newCustomer) {
            _context.Customer.Add(newCustomer);
            await _context.SaveChangesAsync();
            return Ok(newCustomer);
        }

        [HttpPut]
        public async Task<IActionResult> Modifiy([FromBody] Customer newCustomer) {
            var customer = await _context.Customer.FindAsync(newCustomer.Id);
            if (customer == null) {
                return NotFound("Item Not Found");
            }
            customer.FirstName = newCustomer.FirstName;
            customer.LastName = newCustomer.LastName;
            customer.Email = newCustomer.Email;
            customer.SubStartDate = newCustomer.SubStartDate;
            customer.SubEndDate = newCustomer.SubEndDate;
            customer.PassRemain = newCustomer.PassRemain;
            _context.Customer.Update(customer);
            await _context.SaveChangesAsync();
            return Ok(customer);
        }
    }
}
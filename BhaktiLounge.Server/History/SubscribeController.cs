using BhaktiLounge.Server.Data;
using BhaktiLounge.Server.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;



namespace BhaktiLounge.Server.Controllers
{
    [Authorize]
    [Route("api/v1/[controller]")]
    [ApiController]
    public class SubscribeController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<SubscribeController> _logger;

        public SubscribeController(ApplicationDbContext context, ILogger<SubscribeController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpPost]
        public async Task<IActionResult> UpdateSubscription([FromBody] Subscription subscription)
        {
            // Find the customer based on CustomerId provided in the subscription data
            var customer = await _context.Customer.FindAsync(subscription.CustomerId);
            if (customer == null)
            {
                return NotFound("Customer not found");
            }

            // Update customer details with subscription information
            customer.SubStartDate = toDate(subscription.SubStartDate);
            customer.SubEndDate = toDate(subscription.SubEndDate);
            customer.PassRemain = subscription.PassRemain;  // Assuming PassRemain is included in SubscriptionDto

            // Save the updated customer data
            _context.Customer.Update(customer);
            await _context.SaveChangesAsync();

            return Ok(customer);
        }

        private static DateOnly? toDate(string dateISO)
        {
            if (dateISO == null) 
                return null;
        
            return DateOnly.ParseExact(dateISO,"yyyy-MM-dd");
        }
    }
}


using BhaktiLounge.Server.Data;
using BhaktiLounge.Server.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BhaktiLounge.Server.Controllers {

    [Authorize]
    [Route("api/v1/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase {
        private readonly ApplicationDbContext _context;

        public PaymentController(ApplicationDbContext context) {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllPayments() {
            try {
                var payments = await _context.Payment.OrderBy(m => m.Id).ToArrayAsync();
                return Ok(payments);
            } catch (Exception ex) {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [Authorize(Roles = "Manager")]
        [HttpPost]
        public async Task<ActionResult> AddPayment([FromBody] Payment? newItem) {
            try {
                newItem ??= new Payment();
                _context.Payment.Add(newItem);
                await _context.SaveChangesAsync();
                return Ok(newItem);
            } catch (Exception ex) {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [Authorize(Roles = "Manager")]
        [HttpPut]
        public async Task<ActionResult> UpdatePayment([FromBody] Payment updated) {
            try {
                var target = await _context.Payment.FindAsync(updated.Id);
                if (target is null) {
                    return NotFound("Item Not Found");
                }
                target.Name = updated.Name;
                target.FixedPriceEnabled = updated.FixedPriceEnabled;
                target.FixedPrice = updated.FixedPrice;
                target.DeductEnabled = updated.DeductEnabled;
                target.Deduct = updated.Deduct;
                target.DiscountEnabled = updated.DiscountEnabled;
                target.Discount = updated.Discount;
                _context.Payment.Update(target);
                await _context.SaveChangesAsync();
                return Ok(target);
            } catch (Exception ex) {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [Authorize(Roles = "Manager")]
        [HttpDelete]
        public async Task<ActionResult> DeletePayment(int Id) {
            try {
                var toDel = await _context.Payment.FindAsync(Id);
                if (toDel is null) {
                    return NotFound("Item Not Found");
                }
                _context.Payment.Remove(toDel);
                await _context.SaveChangesAsync();
                return Ok("Item Deleted");
            } catch (Exception ex) {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
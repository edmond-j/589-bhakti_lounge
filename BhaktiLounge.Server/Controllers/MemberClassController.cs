using BhaktiLounge.Server.Data;
using BhaktiLounge.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace BhaktiLounge.Server.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class MemberClassController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<SubscribeController> _logger;


        public MemberClassController(ApplicationDbContext context, ILogger<SubscribeController> logger)
        {
            _context = context;
            _logger = logger;
        }


        [HttpGet]
        public async Task<IActionResult> GetAllMemberClass()
        {
            var memberClasses = await _context.MemberClass.OrderBy(m=>m.Id).ToArrayAsync();
            return Ok(memberClasses);
        }

        [HttpPost]
        public async Task<ActionResult> AddMemberClass([FromBody] MemberClass memberClass)
        {
            MemberClass newMemberClass = _context.MemberClass.Add(memberClass).Entity;
            await _context.SaveChangesAsync();
            return Ok(newMemberClass);
        }

        [HttpPut]
        public async Task<ActionResult> SaveMemberClass([FromBody] MemberClass memberClass)
        {
             _context.MemberClass.Update(memberClass);
            await _context.SaveChangesAsync();
            return Ok(memberClass);
        }


    }
}

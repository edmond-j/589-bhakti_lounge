using BhaktiLounge.Server.Data;
using BhaktiLounge.Server.Models;
using BhaktiLounge.Server.Services;
using Microsoft.AspNetCore.Mvc;

namespace BhaktiLounge.Server.Controllers;
[Route("api/v1/[controller]")]
[ApiController]
public class CheckinController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly ILogger<ActivityController> _logger;
    private readonly ICheckinService _service;
    
    public CheckinController(ApplicationDbContext context, ILogger<ActivityController> logger, ICheckinService service)
    {
        _context = context;
        _logger = logger;
        _service = service;
    }
    
    [HttpGet]
    public async Task<ActionResult> GetAllCheckins()
    {
        var checkins = await _service.GetAllCheckins();
        return Ok(checkins);
    }
    
    [HttpPost]
    public async Task<ActionResult> AddCheckin([FromBody] Checkin? newCheckin)
    {
        if (newCheckin == null)
        {
            return BadRequest("Checkin data is required.");
        }
        return await _service.AddCheckin(newCheckin)? Ok(newCheckin) : BadRequest("Failed to add checkin.") ;
    }
    
}
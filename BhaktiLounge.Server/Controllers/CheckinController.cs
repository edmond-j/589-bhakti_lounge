using BhaktiLounge.Server.Data;
using BhaktiLounge.Server.Models;
using BhaktiLounge.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BhaktiLounge.Server.Controllers;
[Authorize]
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
    [Authorize(Roles = "Manager")]
    [HttpGet]
    public async Task<ActionResult> GetAllCheckins()
    {
        var checkins = await _service.GetAllCheckins();
        return Ok(checkins);
    }

    [HttpGet("today-checkins")]
    public async Task<ActionResult> GetTodayCheckins()
    {
        DateOnly todayDate = DateOnly.FromDateTime(DateTime.Now);
        var todayCheckins = await _context.Checkin
                .Where(c => c.Date == todayDate)
                .ToArrayAsync();

        var activityIncludeDinnerIds = await _context.Activity
                .Where(a => a.IncludeDinner == true)
                .Select(a => a.Id)
                .ToListAsync();

        var totalDinnerCheckins = todayCheckins
                .Where(c => c.ActivitiesId.Any(a => activityIncludeDinnerIds.Contains(a)) || c.EventId.HasValue)
                .ToList();

        var dinnerTimeIds = await _context.Activity
                .Where(a => EF.Functions.Like(a.Name.ToLower(), "%7:15%") && EF.Functions.Like(a.Name.ToLower(), "%yoga%") || EF.Functions.Like(a.Name.ToLower(), "%takeaway%"))
                .Select(a => a.Id)
                .ToListAsync();

        var takeawayDinnerCheckins = todayCheckins
                .Where(c => c.ActivitiesId.Any(a => dinnerTimeIds.Contains(a)) && c.ActivitiesId.Any(a => activityIncludeDinnerIds.Contains(a)))
                .ToList();

        var result = new
        {
            TotalCheckIns = todayCheckins.Count(),
            DineInDinners = totalDinnerCheckins.Count() - takeawayDinnerCheckins.Count(),
            TakeawayDinners = takeawayDinnerCheckins.Count()
        };
        return Ok(result);
    }

    [HttpPost]
    public async Task<ActionResult> AddCheckin([FromBody] Checkin? newItem)
    {
        if (newItem == null)
        {
            return BadRequest("Checkin data is required.");
        }
        return await _service.AddCheckin(newItem) ? Ok(newItem) : BadRequest("Failed to add checkin.");
    }
}
using BhaktiLounge.Server.Data;
using BhaktiLounge.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace BhaktiLounge.Server.Services;

public class CheckinService : ICheckinService {
    private readonly ApplicationDbContext _context;

    public CheckinService(ApplicationDbContext context) {
        _context = context;
    }

    public async Task<List<Checkin>> GetAllCheckins() {
        var checkins =
            await _context.Checkin
                .Include(c => c.Customer)
                .OrderBy(a => a.Id)
                .ToArrayAsync();
        return checkins.ToList();
    }

    public async Task<Boolean> AddCheckin(Checkin checkin) {
        _context.Checkin.Add(checkin);
        try {
            var affectedRows = await _context.SaveChangesAsync();
            return affectedRows == 1; // Returns the number of entities written to the database
        } catch (DbUpdateException ex) {
            throw new InvalidOperationException("Error saving the activity to the database.", ex);
        } catch (Exception ex) {
            throw new Exception("An unexpected error occurred.", ex);
        }
    }
}
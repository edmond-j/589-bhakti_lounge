using BhaktiLounge.Server.Data;
using BhaktiLounge.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BhaktiLounge.Server.Services;

public class ActivityService : IActivityService {
    private readonly ApplicationDbContext _context;

    public ActivityService(ApplicationDbContext context) {
        _context = context;
    }

    public async Task<List<Activity>> GetAllActivity() {
        var activities = await _context.Activity.OrderBy(a => a.Name).ToArrayAsync();
        return activities.ToList();
    }

    public async Task<Boolean> AddActivity(Activity activity) {
        _context.Activity.Add(activity);
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
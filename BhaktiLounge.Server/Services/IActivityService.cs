using BhaktiLounge.Server.Models;

namespace BhaktiLounge.Server.Services;

public interface IActivityService
{
    public Task<List<Activity>> GetAllActivity();
    public Task<Boolean> AddActivity(Activity activity);
}
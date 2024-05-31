using BhaktiLounge.Server.Data;
using BhaktiLounge.Server.Models;
using Microsoft.AspNetCore.Mvc;

namespace BhaktiLounge.Server.Services;

public interface ICheckinService {

    public Task<List<Checkin>> GetAllCheckins();

    public Task<Boolean> AddCheckin(Checkin checkin);
}
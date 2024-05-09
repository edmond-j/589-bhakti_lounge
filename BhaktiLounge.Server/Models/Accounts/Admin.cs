using Microsoft.AspNetCore.Identity;

namespace BhaktiLounge.Server.Models.Accounts;

public class Admin : IdentityUser
{
    public string FirstName { get; set; } = default!;
    public string LastName { get; set; } = default!;
}
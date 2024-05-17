using BhaktiLounge.Server.Models.Extensions;

namespace BhaktiLounge.Server.Models;

public class Customer {
    public int Id { get; set; }
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public Gender? Gender { get; set; }
    public string? Acquisition { get; set; }
    public DateTime? InitialRegistered { get; set; }
    public DateOnly? SubStartDate { get; set; }
    public DateOnly? SubEndDate { get; set; }
    public int? PassRemain { get; set; }
    public bool? Notification { get; set; }
}
namespace BhaktiLounge.Server.Models.Accounts;

public class RegisterModel : UserModel
{
    public required string Email { get; set; }
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
}
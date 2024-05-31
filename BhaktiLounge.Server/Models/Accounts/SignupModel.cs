namespace BhaktiLounge.Server.Models.Accounts;

public class SignupModel : UserModel
{
    public required string Role { get; set; }
    public required string Password { get; set; }
}
namespace BhaktiLounge.Server.Models.Accounts;

public class SignupModel : UserModel
{
    public required string Email { get; set; }
    public string FirstName { get; set; } = "~First Name";
    public string LastName { get; set; } = "~Last Name";
}
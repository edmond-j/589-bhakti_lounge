namespace BhaktiLounge.Server.Models.Accounts;

public class LoginModel: UserModel
{
    public required string Password { get; set; }
}
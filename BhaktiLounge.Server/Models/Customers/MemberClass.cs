namespace BhaktiLounge.Server.Models;

public class MemberClass {
    public int Id { get; set; }
    public string Name { get; set; } = "~New";
    public int? Duration { get; set; }
    public int? Pass { get; set; }
    public double Price { get; set; }
}
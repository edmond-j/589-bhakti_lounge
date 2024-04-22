namespace BhaktiLounge.Server.Models {

    public class MemberClass {
        public int Id { get; set; }
        public required string Name { get; set; }
        public int? Duration { get; set; }
        public int? Pass { get; set; }
        public double Price { get; set; }
    }
}
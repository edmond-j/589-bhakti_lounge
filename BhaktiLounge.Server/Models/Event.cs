namespace BhaktiLounge.Server.Models {

    public class Event {
        public int Id { get; set; }
        public required string Name { get; set; }
        public DateOnly Date { get; set; }
        public TimeOnly? StartTime { get; set; }
        public TimeOnly? EndTime { get; set; }
        public double Price { get; set; }
    }
}
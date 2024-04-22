namespace BhaktiLounge.Server.Models {

    public class Activity {
        public int Id { get; set; }
        public string Name { get; set; } = "New Activity";
        public double Price { get; set; } = 0;
        public TimeOnly? StartTime { get; set; }
        public TimeOnly? EndTime { get; set; }
        public HashSet<DayOfWeek>? DaysOfWeek { get; set; }
    }
}
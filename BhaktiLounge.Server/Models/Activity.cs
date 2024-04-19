namespace BhaktiLounge.Server.Models {

    public class Activity {
        public int Id { get; set; }
        public string Type { get; set; } = string.Empty;//将所有的组合都单独列出来
        public double Price { get; set; } = 0;
        public TimeOnly? StartTime { get; set; }
        public TimeOnly? EndTime { get; set; }
        public DayOfWeek DayOfWeek { get; set; }
        public bool? SoulFeast { get; set; } = false;
    }
}
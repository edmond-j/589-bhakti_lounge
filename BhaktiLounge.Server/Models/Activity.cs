using System.Globalization;

namespace BhaktiLounge.Server.Models {

    public class Activity {
        public int Id { get; set; }
        public string Name { get; set; } = "New Activity";
        public double Price { get; set; } = 0;
        private TimeOnly? startTime = TimeOnly.MinValue;

        public string? StartTime {
            get => startTime?.ToString("HH:mm", CultureInfo.InvariantCulture);
            set => startTime = value == null ? (TimeOnly?)null : TimeOnly.ParseExact(value, "HH:mm", CultureInfo.InvariantCulture);
        }

        private TimeOnly? endTime = TimeOnly.MaxValue;

        public string? EndTime {
            get => endTime?.ToString("HH:mm", CultureInfo.InvariantCulture);
            set => endTime = value == null ? (TimeOnly?)null : TimeOnly.ParseExact(value, "HH:mm", CultureInfo.InvariantCulture);
        }

        public List<DayOfWeek>? DaysOfWeek { get; set; } = new List<DayOfWeek> { DayOfWeek.Monday };

        public bool? IncludeDinner { get; set; } = false;
        public bool? IncludeYoga { get; set; } = false;

        public TimeOnly? GetStartTime() {
            return startTime;
        }

        public void SetStartTime(TimeOnly? startTime) {
            this.startTime = startTime;
        }

        public TimeOnly? GetEndTime() {
            return endTime;
        }

        public void SetEndTime(TimeOnly? endTime) {
            this.endTime = endTime;
        }
    }
}
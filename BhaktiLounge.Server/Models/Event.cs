using System.Globalization;

namespace BhaktiLounge.Server.Models {

    public class Event {
        public int Id { get; set; }
        public string Name { get; set; } = "New Event";
        public DateOnly Date { get; set; }
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

        public double Price { get; set; } = 0;

        public TimeOnly? GetStartTime() {
            return startTime;
        }

        public void SetStartTime(TimeOnly? startTime) {
            this.startTime = startTime;
        }

        public Event() {
            Date = DateOnly.FromDateTime(DateTime.Now);
        }
    }
}
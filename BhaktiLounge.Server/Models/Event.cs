using System.Globalization;

namespace BhaktiLounge.Server.Models {

    public class Event {
        public int Id { get; set; }
        public required string Name { get; set; }
        public DateOnly Date { get; set; }
        private TimeOnly? startTime;

        public string? StartTime {
            get => startTime?.ToString("HH:mm", CultureInfo.InvariantCulture);
            set => startTime = value == null ? (TimeOnly?)null : TimeOnly.ParseExact(value, "HH:mm", CultureInfo.InvariantCulture);
        }

        private TimeOnly? endTime;

        public string? EndTime {
            get => endTime?.ToString("HH:mm", CultureInfo.InvariantCulture);
            set => endTime = value == null ? (TimeOnly?)null : TimeOnly.ParseExact(value, "HH:mm", CultureInfo.InvariantCulture);
        }

        public double Price { get; set; }

        public TimeOnly? GetStartTime() {
            return startTime;
        }

        public void SetStartTime(TimeOnly? startTime) {
            this.startTime = startTime;
        }
    }
}
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

        //public List<string>? DaysOfWeek {
        //    get {
        //        List<string> dayName = new List<string>();
        //        foreach (DayOfWeek day in daysOfWeek) {
        //            dayName.Add(day.ToString());
        //        }
        //        return dayName;
        //    }
        //    //get { return ["tonday"]; }
        //    set {
        //        if (value == null) {
        //            daysOfWeek = null;
        //        } else {
        //            daysOfWeek = value.ConvertAll(day =>
        //                (DayOfWeek)Enum.Parse(typeof(DayOfWeek), day, ignoreCase: true));
        //        }
        //    }
        //}

        public bool? IncludeDinner { get; set; } = false;
        public bool? IncludeYoga { get; set; } = false;

        public TimeOnly? GetStartTime() {
            return startTime;
        }

        public void SetStartTime(TimeOnly? startTime) {
            this.startTime = startTime;
        }
    }
}
namespace BhaktiLounge.Server.Models {

    public class CheckInRecord {
        public int Id { get; set; }
        public DateOnly Date { get; set; }
        public TimeOnly Time { get; set; }
        public Customer Customer { get; set; }
        public string Payment { get; set; }
        public Activity Activity { get; set; }
        public bool IsFirstTime { get; set; }
    }
}
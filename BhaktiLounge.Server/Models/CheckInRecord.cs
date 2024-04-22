using System.ComponentModel.DataAnnotations.Schema;

namespace BhaktiLounge.Server.Models {

    public class CheckInRecord {
        public int Id { get; set; }
        public DateOnly Date { get; set; }
        public TimeOnly Time { get; set; }
        public int CustomerId { get; set; }

        [ForeignKey("CustomerId")]
        public required Customer Customer { get; set; }

        public required string PaymentMethod { get; set; }//数组
        public required string[] ActivityName { get; set; }
        public required string EventName { get; set; }
        public double TotalPrice { get; set; }
        public bool IsFirstTime { get; set; }
    }
}
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using BhaktiLounge.Server.Models.Extensions;

namespace BhaktiLounge.Server.Models {

    public class Checkin {
        public int Id { get; set; }
        public DateOnly Date { get; set; }
        public TimeOnly Time { get; set; }

        [Required]
        public int CustomerId { get; set; }

        public Customer? Customer { get; set; }
        public string? Payment { get; set; }
        public List<int>? ActivitiesId { get; set; }
        public int? EventId { get; set; }
        public Event? Event { get; set; }
        public double TotalPrice { get; set; }
        public bool IsFirstTime { get; set; }
    }
}
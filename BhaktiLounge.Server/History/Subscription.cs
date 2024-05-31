using static System.Runtime.InteropServices.JavaScript.JSType;

namespace BhaktiLounge.Server.Models
{
    public class Subscription
    {
        public int CustomerId { get; set; }

        /// <summary>
        /// Start date of Subscription in ISO date format
        /// <example>2024-05-01</example>
        /// </summary>
        public string? SubStartDate { get; set; }

        /// <summary>
        /// End date of Subscription in ISO date format
        /// <example>2024-08-01</example>
        /// </summary>
        public string? SubEndDate { get; set; }

      
        public int? PassRemain { get; set; }
    }
}

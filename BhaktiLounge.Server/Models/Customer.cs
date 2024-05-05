namespace BhaktiLounge.Server.Models {

    public class Customer 
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Pronoun { get; set; } = "other";
        public string? Acquisition { get; set; }
        public DateTime? InitialRegisted { get; set; }
        public DateOnly? SubStartDate { get; set; } = null;
        public DateOnly? SubEndDate { get; set; } = null;
        public int? PassRemain { get; set; }
    }
}
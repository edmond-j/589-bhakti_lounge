namespace BhaktiLounge.Server.Models {

    public class Customer {
        public int Id { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public Gender? Pronoun { get; set; }
        public string? Acquisition { get; set; }
        public DateTime? InitialRegisted { get; set; }
        public DateOnly? SubStartDate { get; set; }
        public DateOnly? SubEndDate { get; set; }
        public int? PassCredit { get; set; }

        public enum Gender { He, She, They, Other }
    }
}
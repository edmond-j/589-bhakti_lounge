namespace BhaktiLounge.Server.Models {

    public class Customer {
        public int Id { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public Sex? Gender { get; set; }
        public string? Acquisition { get; set; }
        public MemberClass? MemberClass { get; set; }
        public DateTime? InitialSubscribed { get; set; }
        public DateOnly? SubStartDate { get; set; }
        public DateOnly? SubEndDate { get; set; }
        public int? PassCredit { get; set; }

        public enum Sex { Male, Female, UniSex }
    }
}
namespace BhaktiLounge.Server.Models {

    public class Payment {
        public int Id { get; set; }
        public string? Name { get; set; } = "~New Payment";
        public bool? FixedPriceEnabled { get; set; } = false;
        public double? FixedPrice { get; set; }
        public bool? DeductEnabled { get; set; } = false;
        public double? Deduct { get; set; }
        public bool? DiscountEnabled { get; set; } = false;
        public double? Discount { get; set; }
    }
}

using BhaktiLounge.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace BhaktiLounge.Server.Data {

    public class ApplicationDbContext : DbContext {

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) {
        }

        public DbSet<Activity> Activity { get; set; } = default!;
        public DbSet<CheckInRecord> CheckInRecord { get; set; } = default!;
        public DbSet<Customer> Customer { get; set; } = default!;
        public DbSet<Event> Event { get; set; } = default!;
        public DbSet<MemberClass> MemberClass { get; set; } = default!;
    }
}
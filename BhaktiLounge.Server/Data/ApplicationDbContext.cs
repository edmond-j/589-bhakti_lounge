using BhaktiLounge.Server.Models;
using BhaktiLounge.Server.Models.Accounts;
using BhaktiLounge.Server.Models.Extensions;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace BhaktiLounge.Server.Data {

    public class ApplicationDbContext : IdentityDbContext<Admin> {

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) {
        }

        public DbSet<Checkin> Checkin { get; set; } = default!;
        public DbSet<Activity> Activity { get; set; } = default!;
        public DbSet<Event> Event { get; set; } = default!;
        public DbSet<Customer> Customer { get; set; } = default!;
        public DbSet<MemberClass> MemberClass { get; set; } = default!;
        public DbSet<Acquisition> Acquisition { get; set; } = default!;
    }
}
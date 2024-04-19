using BhaktiLounge.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace BhaktiLounge.Server.Data {

    public class ApplicationDbContext : DbContext {

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) {
        }

        public DbSet<Activity> Activity { get; set; } = default!;
        public DbSet<Event> Event { get; set; } = default!;
    }
}
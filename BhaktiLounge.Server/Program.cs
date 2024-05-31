using System.Security.Claims;
using System.Text;
using BhaktiLounge.Server.Data;
using BhaktiLounge.Server.Data.Conveters;
using BhaktiLounge.Server.Models.Accounts;
using BhaktiLounge.Server.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

namespace BhaktiLounge.Server {

    public class Program {
        public static void Main(string[] args) {
            var builder = WebApplication.CreateBuilder(args);

            // Configure services
            ConfigureServices(builder);

            var app = builder.Build();
            MigrateDatabase(app);
            // Configure middleware and endpoints
            ConfigureApp(app);

            app.Run();
        }

        private static void ConfigureServices(WebApplicationBuilder builder) {
            // Database configuration
            switch (Environment.GetEnvironmentVariable("PROFILE"))
            {
                case null:
                    builder.Services.AddDbContext<ApplicationDbContext>(option =>
                        option.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
                    break;
                case "HOME_LAB":
                    builder.Services.AddDbContext<ApplicationDbContext>(option =>
                        option.UseNpgsql(builder.Configuration.GetConnectionString("HomeLabConnection")));
                    break;
                case "PRODUCTION":
                    builder.Services.AddDbContext<ApplicationDbContext>(option =>
                        option.UseNpgsql(builder.Configuration.GetConnectionString("ProductionConnection")));
                    break;
            }



            // JSON converters and controllers
            builder.Services.AddControllers().AddJsonOptions(options => {
                options.JsonSerializerOptions.Converters.Add(new DayOfWeekConverter());
                options.JsonSerializerOptions.Converters.Add(new GenderConverter());
            });

            // Scoped services
            builder.Services.AddScoped<IActivityService, ActivityService>();
            builder.Services.AddScoped<ICheckinService, CheckinService>();

            // Swagger
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            // Identity and Authentication
            builder.Services.AddIdentity<Admin, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();

            builder.Services.AddAuthentication(options => {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(o => {
                o.TokenValidationParameters = new TokenValidationParameters {
                    ValidIssuer = builder.Configuration["Jwt:Issuer"],
                    ValidAudience = builder.Configuration["Jwt:Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"])),
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    RoleClaimType = ClaimTypes.Role
                };
            });

            // Authorization
            builder.Services.AddAuthorization();

        }

        private static void MigrateDatabase(WebApplication app)
        {
            using (var scope = app.Services.CreateScope())
            {
                var services = scope.ServiceProvider;
                try
                {
                    var context = services.GetRequiredService<ApplicationDbContext>();
                    context.Database.Migrate();
                }
                catch (Exception ex)
                {
                    var logger = services.GetRequiredService<ILogger<Program>>();
                    logger.LogError(ex, "An error occurred while migrating the database.");
                }
            }
        }

        private static void ConfigureApp(WebApplication app) {
            // Static files and HTTP redirection
            app.UseDefaultFiles();
            app.UseStaticFiles();
            app.UseHttpsRedirection();

            // Swagger in development
            if (app.Environment.IsDevelopment()) {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            EnsureRolesCreated(app.Services).Wait();


            // Authentication and Authorization
            app.UseAuthentication();
            app.UseAuthorization();

            // Controllers and Fallback
            app.MapControllers();
            app.MapFallbackToFile("/index.html");
        }
        private static async Task EnsureRolesCreated(IServiceProvider serviceProvider)
        {
            using var scope = serviceProvider.CreateScope();
            var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();

            string[] roleNames = [ "Manager", "Staff"];
            foreach (var roleName in roleNames)
            {
                if (!await roleManager.RoleExistsAsync(roleName))
                {
                    await roleManager.CreateAsync(new IdentityRole(roleName));
                }
            }
        }

    }
}

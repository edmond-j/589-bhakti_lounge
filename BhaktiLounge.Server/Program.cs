using BhaktiLounge.Server.Data;
using BhaktiLounge.Server.Data.Conveters;
using BhaktiLounge.Server.Models;
using BhaktiLounge.Server.Services;
using Microsoft.EntityFrameworkCore;

namespace BhaktiLounge.Server {

    public class Program {

        public static void Main(string[] args) {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddDbContext<ApplicationDbContext>(option => {
                option.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
            });
            builder.Services.AddControllers().AddJsonOptions(options => {
                options.JsonSerializerOptions.Converters.Add(new TimeOnlyConverter());
                options.JsonSerializerOptions.Converters.Add(new DayOfWeekConverter());
                options.JsonSerializerOptions.Converters.Add(new DateOnlyConverter());
                options.JsonSerializerOptions.Converters.Add(new GenderConverter());
                options.JsonSerializerOptions.Converters.Add(new AcquisitionConverter());
            });
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddScoped<IActivityService, ActivityService>();
            builder.Services.AddScoped<ICheckinService, CheckinService>();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
    
   

            var app = builder.Build();

            app.UseDefaultFiles();
            app.UseStaticFiles();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment()) {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.MapControllers();

            app.MapFallbackToFile("/index.html");

            app.Run();
        }
    }
}
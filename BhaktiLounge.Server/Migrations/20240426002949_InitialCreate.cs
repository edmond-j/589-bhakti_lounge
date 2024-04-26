using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace BhaktiLounge.Server.Migrations {

    /// <inheritdoc />
    public partial class InitialCreate : Migration {

        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder) {
            migrationBuilder.CreateTable(
                name: "Activity",
                columns: table => new {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Price = table.Column<double>(type: "double precision", nullable: false),
                    StartTime = table.Column<string>(type: "text", nullable: true),
                    EndTime = table.Column<string>(type: "text", nullable: true),
                    DaysOfWeek = table.Column<int[]>(type: "integer[]", nullable: true),
                    IncludeDinner = table.Column<bool>(type: "boolean", nullable: true),
                    IncludeYoga = table.Column<bool>(type: "boolean", nullable: true)
                },
                constraints: table => {
                    table.PrimaryKey("PK_Activity", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Customer",
                columns: table => new {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    FirstName = table.Column<string>(type: "text", nullable: false),
                    LastName = table.Column<string>(type: "text", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false),
                    Pronoun = table.Column<int>(type: "integer", nullable: true),
                    Acquisition = table.Column<string>(type: "text", nullable: true),
                    InitialRegisted = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    SubStartDate = table.Column<DateOnly>(type: "date", nullable: true),
                    SubEndDate = table.Column<DateOnly>(type: "date", nullable: true),
                    PassCredit = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table => {
                    table.PrimaryKey("PK_Customer", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Event",
                columns: table => new {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Date = table.Column<DateOnly>(type: "date", nullable: false),
                    StartTime = table.Column<TimeOnly>(type: "time without time zone", nullable: true),
                    EndTime = table.Column<TimeOnly>(type: "time without time zone", nullable: true),
                    Price = table.Column<double>(type: "double precision", nullable: false)
                },
                constraints: table => {
                    table.PrimaryKey("PK_Event", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "MemberClass",
                columns: table => new {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Duration = table.Column<int>(type: "integer", nullable: true),
                    Pass = table.Column<int>(type: "integer", nullable: true),
                    Price = table.Column<double>(type: "double precision", nullable: false)
                },
                constraints: table => {
                    table.PrimaryKey("PK_MemberClass", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CheckInRecord",
                columns: table => new {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Date = table.Column<DateOnly>(type: "date", nullable: false),
                    Time = table.Column<TimeOnly>(type: "time without time zone", nullable: false),
                    CustomerId = table.Column<int>(type: "integer", nullable: false),
                    PaymentMethod = table.Column<string>(type: "text", nullable: false),
                    ActivityName = table.Column<List<string>>(type: "text[]", nullable: true),
                    EventName = table.Column<string>(type: "text", nullable: true),
                    TotalPrice = table.Column<double>(type: "double precision", nullable: false),
                    IsFirstTime = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table => {
                    table.PrimaryKey("PK_CheckInRecord", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CheckInRecord_Customer_CustomerId",
                        column: x => x.CustomerId,
                        principalTable: "Customer",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CheckInRecord_CustomerId",
                table: "CheckInRecord",
                column: "CustomerId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder) {
            migrationBuilder.DropTable(
                name: "Activity");

            migrationBuilder.DropTable(
                name: "CheckInRecord");

            migrationBuilder.DropTable(
                name: "Event");

            migrationBuilder.DropTable(
                name: "MemberClass");

            migrationBuilder.DropTable(
                name: "Customer");
        }
    }
}
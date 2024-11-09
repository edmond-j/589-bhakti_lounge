using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace BhaktiLounge.Server.Migrations
{
    /// <inheritdoc />
    public partial class AddPaymentModule : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Payment",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: true),
                    FixedPriceEnabled = table.Column<bool>(type: "boolean", nullable: true),
                    FixedPrice = table.Column<double>(type: "double precision", nullable: true),
                    DeductEnabled = table.Column<bool>(type: "boolean", nullable: true),
                    Deduct = table.Column<double>(type: "double precision", nullable: true),
                    DiscountEnabled = table.Column<bool>(type: "boolean", nullable: true),
                    Discount = table.Column<double>(type: "double precision", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Payment", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Payment");
        }
    }
}

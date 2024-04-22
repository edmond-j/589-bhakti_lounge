using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BhaktiLounge.Server.Migrations
{
    /// <inheritdoc />
    public partial class _2ndClarification : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EndDate",
                table: "Event");

            migrationBuilder.DropColumn(
                name: "SoulFeast",
                table: "Activity");

            migrationBuilder.RenameColumn(
                name: "StartDate",
                table: "Event",
                newName: "Date");

            migrationBuilder.RenameColumn(
                name: "Gender",
                table: "Customer",
                newName: "Pronoun");

            migrationBuilder.AlterColumn<string>(
                name: "EventName",
                table: "CheckInRecord",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "ActivityName",
                table: "CheckInRecord",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Date",
                table: "Event",
                newName: "StartDate");

            migrationBuilder.RenameColumn(
                name: "Pronoun",
                table: "Customer",
                newName: "Gender");

            migrationBuilder.AddColumn<DateOnly>(
                name: "EndDate",
                table: "Event",
                type: "date",
                nullable: false,
                defaultValue: new DateOnly(1, 1, 1));

            migrationBuilder.AlterColumn<string>(
                name: "EventName",
                table: "CheckInRecord",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ActivityName",
                table: "CheckInRecord",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "SoulFeast",
                table: "Activity",
                type: "bit",
                nullable: true);
        }
    }
}

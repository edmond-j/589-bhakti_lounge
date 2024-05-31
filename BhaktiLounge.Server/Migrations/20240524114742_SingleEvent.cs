using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BhaktiLounge.Server.Migrations
{
    /// <inheritdoc />
    public partial class SingleEvent : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EventsId",
                table: "Checkin");

            migrationBuilder.AddColumn<int>(
                name: "EventId",
                table: "Checkin",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Checkin_EventId",
                table: "Checkin",
                column: "EventId");

            migrationBuilder.AddForeignKey(
                name: "FK_Checkin_Event_EventId",
                table: "Checkin",
                column: "EventId",
                principalTable: "Event",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Checkin_Event_EventId",
                table: "Checkin");

            migrationBuilder.DropIndex(
                name: "IX_Checkin_EventId",
                table: "Checkin");

            migrationBuilder.DropColumn(
                name: "EventId",
                table: "Checkin");

            migrationBuilder.AddColumn<List<int>>(
                name: "EventsId",
                table: "Checkin",
                type: "integer[]",
                nullable: true);
        }
    }
}

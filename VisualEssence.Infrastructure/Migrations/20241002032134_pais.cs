using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VisualEssence.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class pais : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IdJogo",
                table: "JogadaPais");

            migrationBuilder.AddColumn<string>(
                name: "NomeJogo",
                table: "JogadaPais",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NomeJogo",
                table: "JogadaPais");

            migrationBuilder.AddColumn<int>(
                name: "IdJogo",
                table: "JogadaPais",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}

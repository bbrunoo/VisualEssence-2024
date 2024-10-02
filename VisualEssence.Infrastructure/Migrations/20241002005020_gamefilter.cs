using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VisualEssence.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class gamefilter : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "JogoId",
                table: "JogadaInst",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_JogadaInst_JogoId",
                table: "JogadaInst",
                column: "JogoId");

            migrationBuilder.AddForeignKey(
                name: "FK_JogadaInst_Jogo_JogoId",
                table: "JogadaInst",
                column: "JogoId",
                principalTable: "Jogo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_JogadaInst_Jogo_JogoId",
                table: "JogadaInst");

            migrationBuilder.DropIndex(
                name: "IX_JogadaInst_JogoId",
                table: "JogadaInst");

            migrationBuilder.DropColumn(
                name: "JogoId",
                table: "JogadaInst");
        }
    }
}

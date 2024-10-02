using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VisualEssence.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class gamechangefilter : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_JogadaInst_Jogo_JogoId",
                table: "JogadaInst");

            migrationBuilder.DropColumn(
                name: "IdJogo",
                table: "JogadaInst");

            migrationBuilder.AlterColumn<int>(
                name: "JogoId",
                table: "JogadaInst",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<string>(
                name: "NomeJogo",
                table: "JogadaInst",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddForeignKey(
                name: "FK_JogadaInst_Jogo_JogoId",
                table: "JogadaInst",
                column: "JogoId",
                principalTable: "Jogo",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_JogadaInst_Jogo_JogoId",
                table: "JogadaInst");

            migrationBuilder.DropColumn(
                name: "NomeJogo",
                table: "JogadaInst");

            migrationBuilder.AlterColumn<int>(
                name: "JogoId",
                table: "JogadaInst",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "IdJogo",
                table: "JogadaInst",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddForeignKey(
                name: "FK_JogadaInst_Jogo_JogoId",
                table: "JogadaInst",
                column: "JogoId",
                principalTable: "Jogo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

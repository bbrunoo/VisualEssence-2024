using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VisualEssence.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class profilepicture : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Foto",
                table: "UserPais",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Foto",
                table: "UserInst",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Foto",
                table: "CriancaInst",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Foto",
                table: "UserPais");

            migrationBuilder.DropColumn(
                name: "Foto",
                table: "UserInst");

            migrationBuilder.AlterColumn<string>(
                name: "Foto",
                table: "CriancaInst",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(200)",
                oldMaxLength: 200,
                oldNullable: true);
        }
    }
}

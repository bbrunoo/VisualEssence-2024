using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VisualEssence.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class changeshistory : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "UserPaisId",
                table: "JogadaPais",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "UserPaisId",
                table: "CriancaPais",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_JogadaPais_UserPaisId",
                table: "JogadaPais",
                column: "UserPaisId");

            migrationBuilder.CreateIndex(
                name: "IX_CriancaPais_UserPaisId",
                table: "CriancaPais",
                column: "UserPaisId");

            migrationBuilder.AddForeignKey(
                name: "FK_CriancaPais_UserPais_UserPaisId",
                table: "CriancaPais",
                column: "UserPaisId",
                principalTable: "UserPais",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_JogadaPais_UserPais_UserPaisId",
                table: "JogadaPais",
                column: "UserPaisId",
                principalTable: "UserPais",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CriancaPais_UserPais_UserPaisId",
                table: "CriancaPais");

            migrationBuilder.DropForeignKey(
                name: "FK_JogadaPais_UserPais_UserPaisId",
                table: "JogadaPais");

            migrationBuilder.DropIndex(
                name: "IX_JogadaPais_UserPaisId",
                table: "JogadaPais");

            migrationBuilder.DropIndex(
                name: "IX_CriancaPais_UserPaisId",
                table: "CriancaPais");

            migrationBuilder.DropColumn(
                name: "UserPaisId",
                table: "JogadaPais");

            migrationBuilder.DropColumn(
                name: "UserPaisId",
                table: "CriancaPais");
        }
    }
}

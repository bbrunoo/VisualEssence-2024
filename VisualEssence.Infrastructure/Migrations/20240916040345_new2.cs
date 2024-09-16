using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VisualEssence.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class new2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CriancaInst_UserInst_UserInstId",
                table: "CriancaInst");

            migrationBuilder.DropForeignKey(
                name: "FK_JogadaInst_CriancaInst_IdCrianca",
                table: "JogadaInst");

            migrationBuilder.DropForeignKey(
                name: "FK_JogadaPais_CriancaPais_IdCrianca",
                table: "JogadaPais");

            migrationBuilder.AlterColumn<string>(
                name: "Nome",
                table: "Sala",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(100)",
                oldMaxLength: 100);

            migrationBuilder.AlterColumn<DateTime>(
                name: "DataJogo",
                table: "JogadaPais",
                type: "datetime2",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValueSql: "GETDATE()");

            migrationBuilder.AddColumn<Guid>(
                name: "CriancaPaisId",
                table: "JogadaPais",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "DataJogo",
                table: "JogadaInst",
                type: "datetime2",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValueSql: "GETDATE()");

            migrationBuilder.AddColumn<Guid>(
                name: "CriancaInstId",
                table: "JogadaInst",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "SalaId",
                table: "CriancaInst",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "DataEnvio",
                table: "Contato",
                type: "datetime2",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValueSql: "GETDATE()");

            migrationBuilder.CreateIndex(
                name: "IX_UserPais_Email",
                table: "UserPais",
                column: "Email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_JogadaPais_CriancaPaisId",
                table: "JogadaPais",
                column: "CriancaPaisId");

            migrationBuilder.CreateIndex(
                name: "IX_JogadaInst_CriancaInstId",
                table: "JogadaInst",
                column: "CriancaInstId");

            migrationBuilder.CreateIndex(
                name: "IX_CriancaInst_SalaId",
                table: "CriancaInst",
                column: "SalaId");

            migrationBuilder.CreateIndex(
                name: "IX_Contato_Email",
                table: "Contato",
                column: "Email",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_CriancaInst_Sala_SalaId",
                table: "CriancaInst",
                column: "SalaId",
                principalTable: "Sala",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CriancaInst_UserInst_UserInstId",
                table: "CriancaInst",
                column: "UserInstId",
                principalTable: "UserInst",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_JogadaInst_CriancaInst_CriancaInstId",
                table: "JogadaInst",
                column: "CriancaInstId",
                principalTable: "CriancaInst",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_JogadaInst_CriancaInst_IdCrianca",
                table: "JogadaInst",
                column: "IdCrianca",
                principalTable: "CriancaInst",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_JogadaPais_CriancaPais_CriancaPaisId",
                table: "JogadaPais",
                column: "CriancaPaisId",
                principalTable: "CriancaPais",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_JogadaPais_CriancaPais_IdCrianca",
                table: "JogadaPais",
                column: "IdCrianca",
                principalTable: "CriancaPais",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CriancaInst_Sala_SalaId",
                table: "CriancaInst");

            migrationBuilder.DropForeignKey(
                name: "FK_CriancaInst_UserInst_UserInstId",
                table: "CriancaInst");

            migrationBuilder.DropForeignKey(
                name: "FK_JogadaInst_CriancaInst_CriancaInstId",
                table: "JogadaInst");

            migrationBuilder.DropForeignKey(
                name: "FK_JogadaInst_CriancaInst_IdCrianca",
                table: "JogadaInst");

            migrationBuilder.DropForeignKey(
                name: "FK_JogadaPais_CriancaPais_CriancaPaisId",
                table: "JogadaPais");

            migrationBuilder.DropForeignKey(
                name: "FK_JogadaPais_CriancaPais_IdCrianca",
                table: "JogadaPais");

            migrationBuilder.DropIndex(
                name: "IX_UserPais_Email",
                table: "UserPais");

            migrationBuilder.DropIndex(
                name: "IX_JogadaPais_CriancaPaisId",
                table: "JogadaPais");

            migrationBuilder.DropIndex(
                name: "IX_JogadaInst_CriancaInstId",
                table: "JogadaInst");

            migrationBuilder.DropIndex(
                name: "IX_CriancaInst_SalaId",
                table: "CriancaInst");

            migrationBuilder.DropIndex(
                name: "IX_Contato_Email",
                table: "Contato");

            migrationBuilder.DropColumn(
                name: "CriancaPaisId",
                table: "JogadaPais");

            migrationBuilder.DropColumn(
                name: "CriancaInstId",
                table: "JogadaInst");

            migrationBuilder.DropColumn(
                name: "SalaId",
                table: "CriancaInst");

            migrationBuilder.AlterColumn<string>(
                name: "Nome",
                table: "Sala",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<DateTime>(
                name: "DataJogo",
                table: "JogadaPais",
                type: "datetime2",
                nullable: false,
                defaultValueSql: "GETDATE()",
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.AlterColumn<DateTime>(
                name: "DataJogo",
                table: "JogadaInst",
                type: "datetime2",
                nullable: false,
                defaultValueSql: "GETDATE()",
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.AlterColumn<DateTime>(
                name: "DataEnvio",
                table: "Contato",
                type: "datetime2",
                nullable: false,
                defaultValueSql: "GETDATE()",
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.AddForeignKey(
                name: "FK_CriancaInst_UserInst_UserInstId",
                table: "CriancaInst",
                column: "UserInstId",
                principalTable: "UserInst",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_JogadaInst_CriancaInst_IdCrianca",
                table: "JogadaInst",
                column: "IdCrianca",
                principalTable: "CriancaInst",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_JogadaPais_CriancaPais_IdCrianca",
                table: "JogadaPais",
                column: "IdCrianca",
                principalTable: "CriancaPais",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

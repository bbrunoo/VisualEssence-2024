using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VisualEssence.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Contato",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nome = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Assunto = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Descricao = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    DataEnvio = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Contato", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CriancaPais",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Nome = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Idade = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CriancaPais", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Jogo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nome = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Jogo", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UserInst",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    NomeInst = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    CNPJ = table.Column<string>(type: "nvarchar(14)", maxLength: 14, nullable: false),
                    SenhaHash = table.Column<byte[]>(type: "varbinary(max)", nullable: false),
                    SenhaSalt = table.Column<byte[]>(type: "varbinary(max)", nullable: false),
                    IsAdmin = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserInst", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UserPais",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Nome = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    SenhaHash = table.Column<byte[]>(type: "varbinary(max)", nullable: false),
                    SenhaSalt = table.Column<byte[]>(type: "varbinary(max)", nullable: false),
                    IsAdmin = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserPais", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "JogadaPais",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    NomeJogo = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    IdCrianca = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Pontuacao = table.Column<int>(type: "int", nullable: false),
                    DataJogo = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JogadaPais", x => x.Id);
                    table.ForeignKey(
                        name: "FK_JogadaPais_CriancaPais_IdCrianca",
                        column: x => x.IdCrianca,
                        principalTable: "CriancaPais",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Sala",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Nome = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Capacidade = table.Column<int>(type: "int", nullable: false),
                    UserInstId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sala", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Sala_UserInst_UserInstId",
                        column: x => x.UserInstId,
                        principalTable: "UserInst",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "CriancaInst",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Nome = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Sexo = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    NomeResp = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    DataNascimento = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Endereco = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Cpf = table.Column<string>(type: "nvarchar(11)", maxLength: 11, nullable: false),
                    Cns = table.Column<string>(type: "nvarchar(15)", maxLength: 15, nullable: false),
                    Rg = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Tel1 = table.Column<string>(type: "nvarchar(15)", maxLength: 15, nullable: false),
                    Tel2 = table.Column<string>(type: "nvarchar(15)", maxLength: 15, nullable: false),
                    IdSala = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserInstId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Foto = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CriancaInst", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CriancaInst_Sala_IdSala",
                        column: x => x.IdSala,
                        principalTable: "Sala",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CriancaInst_UserInst_UserInstId",
                        column: x => x.UserInstId,
                        principalTable: "UserInst",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "JogadaInst",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    NomeJogo = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    IdCrianca = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Pontuacao = table.Column<int>(type: "int", nullable: false),
                    DataJogo = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UserInstId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CriancaInstId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JogadaInst", x => x.Id);
                    table.ForeignKey(
                        name: "FK_JogadaInst_CriancaInst_CriancaInstId",
                        column: x => x.CriancaInstId,
                        principalTable: "CriancaInst",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_JogadaInst_CriancaInst_IdCrianca",
                        column: x => x.IdCrianca,
                        principalTable: "CriancaInst",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_JogadaInst_UserInst_UserInstId",
                        column: x => x.UserInstId,
                        principalTable: "UserInst",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_CriancaInst_IdSala",
                table: "CriancaInst",
                column: "IdSala");

            migrationBuilder.CreateIndex(
                name: "IX_CriancaInst_UserInstId",
                table: "CriancaInst",
                column: "UserInstId");

            migrationBuilder.CreateIndex(
                name: "IX_JogadaInst_CriancaInstId",
                table: "JogadaInst",
                column: "CriancaInstId");

            migrationBuilder.CreateIndex(
                name: "IX_JogadaInst_IdCrianca",
                table: "JogadaInst",
                column: "IdCrianca");

            migrationBuilder.CreateIndex(
                name: "IX_JogadaInst_UserInstId",
                table: "JogadaInst",
                column: "UserInstId");

            migrationBuilder.CreateIndex(
                name: "IX_JogadaPais_IdCrianca",
                table: "JogadaPais",
                column: "IdCrianca");

            migrationBuilder.CreateIndex(
                name: "IX_Sala_UserInstId",
                table: "Sala",
                column: "UserInstId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Contato");

            migrationBuilder.DropTable(
                name: "JogadaInst");

            migrationBuilder.DropTable(
                name: "JogadaPais");

            migrationBuilder.DropTable(
                name: "Jogo");

            migrationBuilder.DropTable(
                name: "UserPais");

            migrationBuilder.DropTable(
                name: "CriancaInst");

            migrationBuilder.DropTable(
                name: "CriancaPais");

            migrationBuilder.DropTable(
                name: "Sala");

            migrationBuilder.DropTable(
                name: "UserInst");
        }
    }
}

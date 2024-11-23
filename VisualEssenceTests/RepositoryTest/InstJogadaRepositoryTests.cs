using Amazon.S3;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VisualEssence.Domain.DTOs.GamesDTO;
using VisualEssence.Domain.Models;
using VisualEssence.Domain.Models.Jogada;
using VisualEssence.Infrastructure.Data;
using VisualEssence.Infrastructure.Repositories;
using VisualEssence.Infrastructure.Repositories.Jogadas;

namespace VisualEssenceTests.RepositoryTest
{
    public class InstJogadaRepositoryTests : IDisposable
    {

        private readonly ApplicationDbContext _context;
        private readonly JogadaInstRepository _repository;

        public InstJogadaRepositoryTests()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseSqlServer("Data Source=localhost\\SQLEXPRESS;Initial Catalog=JogadaInstTest;Integrated Security=True;Trust Server Certificate=True")
                .Options;

            _context = new ApplicationDbContext(options);
            _context.Database.EnsureDeleted();
            _context.Database.Migrate();

            var s3ClientMock = new Mock<IAmazonS3>();
            var configurationMock = new Mock<IConfiguration>();
            _repository = new JogadaInstRepository(_context, s3ClientMock.Object, configurationMock.Object);
        }

        public void Dispose()
        {
            _context.Database.EnsureDeleted();
            _context.Dispose();
        }

        [Fact]
        public async Task Post_ShouldAddJogadaInst()
        {
            // Arrange
            var user = new UserInst
            {
                Id = Guid.NewGuid(),
                NomeInst = "Institucional",
                Email = "teste@teste.com",
                CNPJ = "12345678000100",
                SenhaHash = new byte[32],
                SenhaSalt = new byte[32],
                IsAdmin = true
            };

            _context.UserInst.Add(user);
            await _context.SaveChangesAsync();

            var sala = new Sala
            {
                Id = Guid.NewGuid(),
                Nome = "Sala Teste",
                Capacidade = 20,
                UserInstId = user.Id
            };

            _context.Sala.Add(sala);
            await _context.SaveChangesAsync();

            var crianca = new CriancaInst
            {
                Nome = "Nova",
                Sexo = "Feminino",
                NomeResp = "Responsável Nova",
                DataNascimento = "2015-01-01",
                Endereco = "Rua Y",
                Cpf = "98765432100",
                Cns = "987654321098765",
                Rg = "RG456",
                Tel1 = "0987654321",
                Tel2 = "0987654322",
                IdSala = sala.Id,
                UserInstId = user.Id
            };

            _context.CriancaInst.Add(crianca);
            await _context.SaveChangesAsync();

            var dto = new JogadaInstDTO
            {
                NomeJogo = "Teste Jogo",
                IdCrianca = crianca.Id,
                Pontuacao = 100,
                UserInstId = user.Id,
            };

            // Act
            var result = await _repository.Post(dto);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(dto.NomeJogo, result.NomeJogo);
            Assert.Equal(dto.Pontuacao, result.Pontuacao);
        }

        [Fact]
        public async Task GetByIdAsync_ShouldReturnJogadaInst()
        {
            // Arrange
            var user = new UserInst
            {
                Id = Guid.NewGuid(),
                NomeInst = "Institucional",
                Email = "teste@teste.com",
                CNPJ = "12345678000100",
                SenhaHash = new byte[32],
                SenhaSalt = new byte[32],
                IsAdmin = true
            };

            _context.UserInst.Add(user);
            await _context.SaveChangesAsync();

            var sala = new Sala
            {
                Id = Guid.NewGuid(),
                Nome = "Sala Teste",
                Capacidade = 20,
                UserInstId = user.Id
            };

            _context.Sala.Add(sala);
            await _context.SaveChangesAsync();

            var crianca = new CriancaInst
            {
                Nome = "Nova",
                Sexo = "Feminino",
                NomeResp = "Responsável Nova",
                DataNascimento = "2015-01-01",
                Endereco = "Rua Y",
                Cpf = "98765432100",
                Cns = "987654321098765",
                Rg = "RG456",
                Tel1 = "0987654321",
                Tel2 = "0987654322",
                IdSala = sala.Id,
                UserInstId = user.Id
            };

            _context.CriancaInst.Add(crianca);
            await _context.SaveChangesAsync();

            var jogada = new JogadaInst
            {
                Id = Guid.NewGuid(),
                NomeJogo = "Teste Jogo",
                IdCrianca = crianca.Id,
                Pontuacao = 100,
                UserInstId = user.Id,
            };

            _context.JogadaInst.Add(jogada);
            await _context.SaveChangesAsync();

            // Act
            var result = await _repository.GetByIdAsync(jogada.Id);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(jogada.NomeJogo, result.NomeJogo);
        }

        [Fact]
        public async Task GetAllAsync_ShouldReturnAllJogadaInst()
        {
            // Arrange
            var user = new UserInst
            {
                Id = Guid.NewGuid(),
                NomeInst = "Institucional",
                Email = "teste@teste.com",
                CNPJ = "12345678000100",
                SenhaHash = new byte[32],
                SenhaSalt = new byte[32],
                IsAdmin = true
            };

            _context.UserInst.Add(user);
            await _context.SaveChangesAsync();

            var sala = new Sala
            {
                Id = Guid.NewGuid(),
                Nome = "Sala Teste",
                Capacidade = 20,
                UserInstId = user.Id
            };

            _context.Sala.Add(sala);
            await _context.SaveChangesAsync();


            var crianca = new CriancaInst
            {
                Nome = "Nova",
                Sexo = "Feminino",
                NomeResp = "Responsável Nova",
                DataNascimento = "2015-01-01",
                Endereco = "Rua Y",
                Cpf = "98765432100",
                Cns = "987654321098765",
                Rg = "RG456",
                Tel1 = "0987654321",
                Tel2 = "0987654322",
                IdSala = sala.Id,
                UserInstId = user.Id
            };

            _context.CriancaInst.Add(crianca);
            await _context.SaveChangesAsync();


            // Arrange
            _context.JogadaInst.AddRange(new List<JogadaInst>
            {
                new JogadaInst { NomeJogo = "Jogo 1", IdCrianca = crianca.Id, Pontuacao = 80, UserInstId = user.Id },
                new JogadaInst { NomeJogo = "Jogo 2", IdCrianca = crianca.Id, Pontuacao = 90, UserInstId = user.Id }
            });
            await _context.SaveChangesAsync();

            // Act
            var result = await _repository.GetAllAsync();

            // Assert
            Assert.NotNull(result);
            Assert.Equal(2, result.Count());
        }
    }
}

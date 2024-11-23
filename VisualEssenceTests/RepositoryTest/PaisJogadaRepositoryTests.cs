using Amazon.S3;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Moq;
using VisualEssence.Domain.DTOs.GamesDTO;
using VisualEssence.Domain.Models.Jogada;
using VisualEssence.Domain.Models;
using VisualEssence.Infrastructure.Data;
using VisualEssence.Infrastructure.Repositories.Jogadas;

namespace VisualEssenceTests.RepositoryTest
{
    public class PaisJogadaRepositoryTests :IDisposable
    {
        private readonly ApplicationDbContext _context;
        private readonly JogadaPaisRepository _repository;

        public PaisJogadaRepositoryTests()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseSqlServer("Data Source=localhost\\SQLEXPRESS;Initial Catalog=JogadaPaisTest;Integrated Security=True;Trust Server Certificate=True")
                .Options;

            _context = new ApplicationDbContext(options);
            _context.Database.EnsureDeleted();
            _context.Database.Migrate();

            var s3ClientMock = new Mock<IAmazonS3>();
            var configurationMock = new Mock<IConfiguration>();
            _repository = new JogadaPaisRepository(_context);
        }

        public void Dispose()
        {
            _context.Database.EnsureDeleted();
            _context.Dispose();
        }

        [Fact]
        public async Task Post_ShouldAddJogadaPais()
        {
            // Arrange
            var user = new UserPais
            {
                Id = Guid.NewGuid(),
                Nome = "Pais",
                Email = "teste@teste.com",
                SenhaHash = new byte[32],
                SenhaSalt = new byte[32],
                IsAdmin = true
            };

            _context.UserPais.Add(user);
            await _context.SaveChangesAsync();

            var crianca = new CriancaPais
            {
                Nome = "Nova",
                Idade = 7,
                UserPaisId = user.Id
            };

            _context.CriancaPais.Add(crianca);
            await _context.SaveChangesAsync();

            var dto = new JogadaPaisDTO
            {
                NomeJogo = "Teste Jogo",
                IdCrianca = crianca.Id,
                Pontuacao = 100,
                UserPaisId = user.Id,
            };

            // Act
            var result = await _repository.Post(dto);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(dto.NomeJogo, result.NomeJogo);
            Assert.Equal(dto.Pontuacao, result.Pontuacao);
        }

        [Fact]
        public async Task GetByIdAsync_ShouldReturnJogadaPais()
        {
            // Arrange
            var user = new UserPais
            {
                Id = Guid.NewGuid(),
                Nome = "Pais",
                Email = "teste@teste.com",
                SenhaHash = new byte[32],
                SenhaSalt = new byte[32],
                IsAdmin = true
            };

            _context.UserPais.Add(user);
            await _context.SaveChangesAsync();

            var crianca = new CriancaPais
            {
                Nome = "Nova",
                Idade = 7,
                UserPaisId = user.Id
            };

            _context.CriancaPais.Add(crianca);
            await _context.SaveChangesAsync();

            var jogada = new JogadaPais
            {
                Id = Guid.NewGuid(),
                NomeJogo = "Teste Jogo",
                IdCrianca = crianca.Id,
                Pontuacao = 100,
                UserPaisId = user.Id,
            };

            _context.JogadaPais.Add(jogada);
            await _context.SaveChangesAsync();

            // Act
            var result = await _repository.GetByIdAsync(jogada.Id);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(jogada.NomeJogo, result.NomeJogo);
        }

        [Fact]
        public async Task GetAllAsync_ShouldReturnAllJogadaPais()
        {
            // Arrange
            var user = new UserPais
            {
                Id = Guid.NewGuid(),
                Nome = "Pais",
                Email = "teste@teste.com",
                SenhaHash = new byte[32],
                SenhaSalt = new byte[32],
                IsAdmin = true
            };

            _context.UserPais.Add(user);
            await _context.SaveChangesAsync();

            var crianca = new CriancaPais
            {
                Nome = "Nova",
                Idade = 7,
                UserPaisId = user.Id
            };

            _context.CriancaPais.Add(crianca);
            await _context.SaveChangesAsync();


            // Arrange
            _context.JogadaPais.AddRange(new List<JogadaPais>
            {
                new JogadaPais { NomeJogo = "Jogo 1", IdCrianca = crianca.Id, Pontuacao = 80, UserPaisId = user.Id },
                new JogadaPais { NomeJogo = "Jogo 2", IdCrianca = crianca.Id, Pontuacao = 90, UserPaisId = user.Id }
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

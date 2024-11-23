using Amazon.S3;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using Moq;
using VisualEssence.Domain.DTOs;
using VisualEssence.Domain.Models;
using VisualEssence.Infrastructure.Data;
using VisualEssence.Infrastructure.Repositories;

namespace VisualEssenceTests.RepositoryTest
{
    public class CriancaPaisRepositoryTests : IDisposable
    {
        private readonly ApplicationDbContext _context;
        private readonly CriancaPaisRepository _repository;
        public CriancaPaisRepositoryTests()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseSqlServer("Data Source=localhost\\SQLEXPRESS;Initial Catalog=CriancaPaisTest;Integrated Security=True;Trust Server Certificate=True")
                .Options;

            _context = new ApplicationDbContext(options);
            _context.Database.EnsureDeleted();
            _context.Database.Migrate();

            _repository = new CriancaPaisRepository(_context);
        }

        public void Dispose()
        {
            _context.Database.EnsureDeleted();
            _context.Dispose();
        }

        [Fact]
        public async Task GetAllAsync_ShouldReturnAllCriancas()
        {
            var user = new UserPais
            {
                Id = Guid.NewGuid(),
                Nome = "Pai",
                Email = "teste@teste.com",
                SenhaHash = new byte[32],
                SenhaSalt = new byte[32],
                IsAdmin = true
            };

            _context.UserPais.Add(user);
            await _context.SaveChangesAsync();

            var crianca1 = new CriancaPais
            {
                Nome = "Nova",
                Idade = 18,
                UserPaisId = user.Id
            };

            var crianca2 = new CriancaPais
            {
                Nome = "Nova 2",
                Idade = 18,
                UserPaisId = user.Id
            };

            _context.CriancaPais.AddRange(crianca1, crianca2);
            await _context.SaveChangesAsync();

            // Act
            var criancas = await _repository.GetAllAsync();

            // Assert
            criancas.Should().HaveCount(2);
            criancas.Should().Contain(c => c.Nome == "Nova");
            criancas.Should().Contain(c => c.Nome == "Nova 2");
        }

        [Fact]
        public async Task GetByIdAsync_ShouldReturnCrianca_WhenExists()
        {
            var user = new UserPais
            {
                Id = Guid.NewGuid(),
                Nome = "Pai",
                Email = "teste@teste.com",
                SenhaHash = new byte[32],
                SenhaSalt = new byte[32],
                IsAdmin = true
            };

            _context.UserPais.Add(user);
            await _context.SaveChangesAsync();

            var crianca = new CriancaPais
            {
                Nome = "Crianca Teste",
                Idade = 7,
                UserPaisId = user.Id
            };

            _context.CriancaPais.Add(crianca);
            await _context.SaveChangesAsync();

            // Act
            var result = await _repository.GetByIdAsync(crianca.Id);

            // Assert
            result.Should().NotBeNull();
            result.Nome.Should().Be("Crianca Teste");
        }

        [Fact]
        public async Task GetByIdAsync_ShouldReturnNull_WhenNotFound()
        {
            // Act
            var result = await _repository.GetByIdAsync(Guid.NewGuid());

            // Assert
            result.Should().BeNull();
        }

        [Fact]
        public async Task UpdateCrianca_ShouldUpdateFields_WhenCriancaExists()
        {
            var user = new UserPais
            {
                Id = Guid.NewGuid(),
                Nome = "Pai",
                Email = "teste@teste.com",
                SenhaHash = new byte[32],
                SenhaSalt = new byte[32],
                IsAdmin = true
            };

            _context.UserPais.Add(user);
            await _context.SaveChangesAsync();

            var crianca = new CriancaPais
            {
                Nome = "Crianca Teste",
                Idade = 7,
                UserPaisId = user.Id
            };

            _context.CriancaPais.Add(crianca);
            await _context.SaveChangesAsync();

            var updatedCrianca = new CriancaPaisDTO
            {
                Nome = "Crianca Atualizada",
                Idade = 7,
                UserPaisId = user.Id
            };

            // Act
            var result = await _repository.Update(crianca.Id, updatedCrianca);

            // Assert
            result.Nome.Should().Be("Crianca Atualizada");
            result.Idade.Should().Be(7);
        }


        [Fact]
        public async Task Delete_ShouldRemoveCrianca_WhenExists()
        {
            var user = new UserPais
            {
                Id = Guid.NewGuid(),
                Nome = "Pai",
                Email = "teste@teste.com",
                SenhaHash = new byte[32],
                SenhaSalt = new byte[32],
                IsAdmin = true
            };

            _context.UserPais.Add(user);
            await _context.SaveChangesAsync();

            var crianca = new CriancaPais
            {
                Nome = "Crianca Teste",
                Idade = 7,
                UserPaisId = user.Id
            };

            _context.CriancaPais.Add(crianca);
            await _context.SaveChangesAsync();

            // Act
            var result = await _repository.Delete(crianca);

            // Assert
            var deletedCrianca = await _context.CriancaPais.FindAsync(crianca.Id);
            deletedCrianca.Should().BeNull();
        }

    }
}

using Amazon.S3;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using Moq;
using VisualEssence.Domain.Models;
using VisualEssence.Infrastructure.Data;
using VisualEssence.Infrastructure.Repositories;

namespace VisualEssenceTests.RepositoryTest
{
    public class CriancaInstRepositoryTests : IDisposable
    {
        private readonly ApplicationDbContext _context;
        private readonly CriancaInstRepository _repository;
        public CriancaInstRepositoryTests()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseSqlServer("Data Source=localhost\\SQLEXPRESS;Initial Catalog=CriancaInstTest;Integrated Security=True;Trust Server Certificate=True")
                .Options;

            _context = new ApplicationDbContext(options);
            _context.Database.EnsureDeleted();
            _context.Database.Migrate();

            var s3ClientMock = new Mock<IAmazonS3>();
            _repository = new CriancaInstRepository(_context, s3ClientMock.Object);
        }

        public void Dispose()
        {
            _context.Database.EnsureDeleted();
            _context.Dispose();
        }

        [Fact]
        public async Task AddCrianca_ShouldThrowException_WhenSalaNotExists()
        {
            var userId = Guid.NewGuid();
            var crianca = new CriancaInst
            {
                Nome = "Teste",
                Sexo = "Masculino",
                NomeResp = "Responsável Teste",
                DataNascimento = "2010-01-01",
                Endereco = "Rua A",
                Cpf = "12345678901",
                Cns = "123456789012345",
                Rg = "RG123456",
                Tel1 = "1234567890",
                IdSala = Guid.NewGuid(),
                UserInstId = userId
            };

            var exception = await Assert.ThrowsAsync<Exception>(async () =>
            {
                await _repository.PostCrianca(crianca);
            });

            exception.Message.Should().Be("Sala não encontrada.");
        }

        [Fact]
        public async Task AddCrianca_ShouldThrowException_WhenSalaIsFull()
        {
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
                Capacidade = 1,
                UserInstId = user.Id
            };

            _context.Sala.Add(sala);
            await _context.SaveChangesAsync();

            var criancaExistente = new CriancaInst
            {
                Nome = "Existente",
                Sexo = "Masculino",
                NomeResp = "Responsável",
                DataNascimento = "2012-01-01",
                Endereco = "Rua X",
                Cpf = "12345678901",
                Cns = "123456789012345",
                Rg = "RG123",
                Tel1 = "1234567890",
                Tel2 = "1234567891",
                IdSala = sala.Id,
                UserInstId = user.Id
            };

            _context.CriancaInst.Add(criancaExistente);
            await _context.SaveChangesAsync();

            var novaCrianca = new CriancaInst
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

            var exception = await Assert.ThrowsAsync<Exception>(async () =>
            {
                await _repository.PostCrianca(novaCrianca);
            });

            exception.Message.Should().Be("Capacidade máxima da sala atingida. Não é possível adicionar a criança.");
        }

        [Fact]
        public async Task GetAllAsync_ShouldReturnAllCriancas()
        {
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

            var crianca1 = new CriancaInst
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

            var crianca2 = new CriancaInst
            {
                Nome = "Nova 2",
                Sexo = "Masculino",
                NomeResp = "Responsável Nova 2",
                DataNascimento = "2012-01-01",
                Endereco = "Rua X",
                Cpf = "12345678901",
                Cns = "123456789012345",
                Rg = "RG123",
                Tel1 = "1234567890",
                Tel2 = "1234567891",
                IdSala = sala.Id,
                UserInstId = user.Id
            };

            _context.CriancaInst.AddRange(crianca1, crianca2);
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

            // Arrange
            var crianca = new CriancaInst
            {
                Id = Guid.NewGuid(),
                Nome = "Crianca Teste",
                Sexo = "Masculino",
                NomeResp = "Responsável Nova 2",
                DataNascimento = "2012-01-01",
                Endereco = "Rua X",
                Cpf = "12345678901",
                Cns = "123456789012345",
                Rg = "RG123",
                Tel1 = "1234567890",
                Tel2 = "1234567891",
                IdSala = sala.Id,
                UserInstId = user.Id
            };
            _context.CriancaInst.Add(crianca);
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
                Id = Guid.NewGuid(),
                Nome = "Crianca Antiga",
                Sexo = "Masculino",
                NomeResp = "Responsável",
                DataNascimento = "2012-01-01",
                Endereco = "Rua X",
                Cpf = "12345678901",
                Cns = "123456789012345",
                Rg = "RG123",
                Tel1 = "1234567890",
                Tel2 = "1234567891",
                IdSala = sala.Id,
                UserInstId = user.Id
            };
            _context.CriancaInst.Add(crianca);
            await _context.SaveChangesAsync();

            var updatedCrianca = new CriancaInst
            {
                Nome = "Crianca Atualizada",
                Sexo = "Feminino",
                NomeResp = "Responsável",
                DataNascimento = "2012-01-01",
                Endereco = "Rua X",
                Cpf = "12345678901",
                Cns = "123456789012345",
                Rg = "RG123",
                Tel1 = "0987654321",
                Tel2 = "0987654322",
                IdSala = sala.Id,
                UserInstId = user.Id
            };

            // Act
            var result = await _repository.UpdateCrianca(crianca.Id, updatedCrianca);

            // Assert
            result.Nome.Should().Be("Crianca Atualizada");
            result.Sexo.Should().Be("Feminino");
            result.Tel1.Should().Be("0987654321");
            result.Tel2.Should().Be("0987654322");
        }


        [Fact]
        public async Task Delete_ShouldRemoveCrianca_WhenExists()
        {
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
                Id = Guid.NewGuid(),
                Nome = "Nova",
                Sexo = "Masculino",
                NomeResp = "Responsável",
                DataNascimento = "2012-01-01",
                Endereco = "Rua X",
                Cpf = "12345678901",
                Cns = "123456789012345",
                Rg = "RG123",
                Tel1 = "1234567890",
                Tel2 = "1234567891",
                IdSala = sala.Id,
                UserInstId = user.Id
            };

            _context.CriancaInst.Add(crianca);
            await _context.SaveChangesAsync();
            // Act
            var result = await _repository.Delete(crianca);

            // Assert
            var deletedCrianca = await _context.CriancaInst.FindAsync(crianca.Id);
            deletedCrianca.Should().BeNull();
        }
    }
}

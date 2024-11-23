using Amazon.S3;
using Microsoft.EntityFrameworkCore;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VisualEssence.Domain.DTOs;
using VisualEssence.Domain.Models;
using VisualEssence.Infrastructure.Data;
using VisualEssence.Infrastructure.Repositories;

namespace VisualEssenceTests.RepositoryTest
{
    public class SalaRepositoryTests : IDisposable
    {
        private readonly ApplicationDbContext _context;
        private readonly SalaRepository _repository;
        public SalaRepositoryTests()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseSqlServer("Data Source=localhost\\SQLEXPRESS;Initial Catalog=SalaTest;Integrated Security=True;Trust Server Certificate=True")
                .Options;

            _context = new ApplicationDbContext(options);
            _context.Database.EnsureDeleted();
            _context.Database.Migrate();

            var s3ClientMock = new Mock<IAmazonS3>();
            _repository = new SalaRepository(_context);
        }

        public void Dispose()
        {
            _context.Database.EnsureDeleted();
            _context.Dispose();
        }

        [Fact]
        public async Task Post_ShouldThrow_WhenCapacidadeIsNegative()
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

            var salaDto = new SalaDTO
            {
                Id = Guid.NewGuid(),
                Nome = "Sala Inválida",
                Capacidade = -10,
                UserInstId = user.Id
            };

            // Act & Assert
            await Assert.ThrowsAsync<ArgumentException>(() => _repository.Post(salaDto));
        }

        [Fact]
        public async Task GetByIdAsync_ShouldReturnSala()
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
                Nome = "Sala 1",
                Capacidade = 20,
                UserInstId = user.Id
            };
            _context.Sala.Add(sala);
            await _context.SaveChangesAsync();

            // Act
            var result = await _repository.GetByIdAsync(sala.Id);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(sala.Nome, result.Nome);
        }

        [Fact]
        public async Task GetByIdAsync_ShouldReturnNull_WhenIdNotFound()
        {
            // Act
            var result = await _repository.GetByIdAsync(Guid.NewGuid());

            // Assert
            Assert.Null(result);
        }

        [Fact]
        public async Task Update_ShouldModifySala()
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
                Nome = "Sala Original",
                Capacidade = 25,
                UserInstId = user.Id,
            };
            _context.Sala.Add(sala);
            await _context.SaveChangesAsync();

            var salaDto = new SalaDTO
            {
                Nome = "Sala Atualizada",
                Capacidade = 35,
                UserInstId = user.Id
            };

            // Act
            var result = await _repository.Update(sala.Id, salaDto);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(salaDto.Nome, result.Nome);
            Assert.Equal(salaDto.Capacidade, result.Capacidade);
        }

        [Fact]
        public async Task Update_ShouldReturnNull_WhenIdNotFound()
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
            
            var salaDto = new SalaDTO
            {
                Nome = "Sala Não Encontrada",
                Capacidade = 40,
                UserInstId = user.Id
            };

            // Act
            var result = await _repository.Update(Guid.NewGuid(), salaDto);

            // Assert
            Assert.Null(result);
        }

        [Fact]
        public async Task Delete_ShouldRemoveSala()
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
            // Arrange
            var sala = new Sala
            {
                Nome = "Sala a Remover",
                Capacidade = 20,
                UserInstId = user.Id,
            };
            _context.Sala.Add(sala);
            await _context.SaveChangesAsync();

            // Act
            var result = await _repository.Delete(sala);

            // Assert
            Assert.NotNull(result);
            Assert.Empty(_context.Sala);
        }

        [Fact]
        public async Task GetAllByUserIdAsync_ShouldReturnSalas()
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

            // Arrange
            var user2 = new UserInst
            {
                Id = Guid.NewGuid(),
                NomeInst = "Institucional",
                Email = "teste@teste.com",
                CNPJ = "12345678000100",
                SenhaHash = new byte[32],
                SenhaSalt = new byte[32],
                IsAdmin = true
            };

            _context.UserInst.Add(user2);
            await _context.SaveChangesAsync();

            _context.Sala.AddRange(new List<Sala>
            {
                new Sala { Nome = "Sala 1", Capacidade = 10, UserInstId = user.Id },
                new Sala { Nome = "Sala 2", Capacidade = 20, UserInstId = user.Id },
                new Sala { Nome = "Outra Sala", Capacidade = 15, UserInstId = user2.Id }
            });
            await _context.SaveChangesAsync();

            // Act
            var result = await _repository.GetAllByUserIdAsync(user.Id);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(2, result.Count());
        }

        [Fact]
        public async Task GetChildrenBySalaIdAsync_ShouldReturnChildren()
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

            // Arrange
            var sala = new Sala
            {
                Nome = "Sala com Crianças",
                Capacidade = 10,
                UserInstId = user.Id,
                CriancaInst = new List<CriancaInst>
                {
                    new CriancaInst {
                        Nome = "Criança 1",
                        Sexo = "Feminino",
                        NomeResp = "Responsável Nova",
                        DataNascimento = "2015-01-01",
                        Endereco = "Rua Y",
                        Cpf = "98765432100",
                        Cns = "987654321098765",
                        Rg = "RG456",
                        Tel1 = "0987654321",
                        Tel2 = "0987654322",
                        UserInstId = user.Id
                    },
                    new CriancaInst {
                        Nome = "Criança 2",
                        Sexo = "Feminino",
                        NomeResp = "Responsável Nova",
                        DataNascimento = "2015-01-01",
                        Endereco = "Rua Y",
                        Cpf = "98765432100",
                        Cns = "987654321098765",
                        Rg = "RG456",
                        Tel1 = "0987654321",
                        Tel2 = "0987654322",
                        UserInstId = user.Id
                    }
                }
            };
            _context.Sala.Add(sala);
            await _context.SaveChangesAsync();

            // Act
            var result = await _repository.GetChildrenBySalaIdAsync(sala.Id);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(2, result.Count());
        }

    }
}

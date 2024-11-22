using Amazon.S3;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VisualEssence.API;
using VisualEssence.Domain.Models;
using VisualEssence.Infrastructure.Data;
using VisualEssenceAPI.Repositories;

namespace VisualEssenceTests
{
    public class UserInstRepositoryTests : IDisposable
    {
        private readonly ApplicationDbContext _context;
        private readonly UsuarioInstRepository _usuarioInstRepository;
        private readonly IAmazonS3 _s3Client;

        public UserInstRepositoryTests()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseSqlServer("Data Source=localhost\\SQLEXPRESS;Initial Catalog=InstTest;Integrated Security=True;Trust Server Certificate=True")
                .Options;

            _context = new ApplicationDbContext(options);
            _context.Database.EnsureDeleted();
            _context.Database.Migrate();

            _usuarioInstRepository = new UsuarioInstRepository(_context, _s3Client);
        }
        public void Dispose()
        {
            _context.Database.EnsureDeleted();
            _context.Dispose();
        }

        [Fact]
        public async Task AddInstUser_ShouldCreateANewUser()
        {
            var user = new UserInst
            {
                NomeInst = "Fatec",
                Email = "fatec@gmail.com",
                CNPJ = "111111111111",
                Senha = "Senha123"
            };

            var addedUser = await _usuarioInstRepository.AddUsuarioInst(user);

            var retrievedUser = await _context.UserInst.FirstOrDefaultAsync(u => u.Id == addedUser.Id);
            retrievedUser.Should().NotBeNull();
            retrievedUser.NomeInst.Should().Be("Fatec");
            retrievedUser.CNPJ.Should().Be("111111111111");
            retrievedUser.Email.Should().Be("fatec@gmail.com");
        }

        [Fact]
        public async Task ExistentsInstUser_ShouldCheckIfAUserExists()
        {
            var user = new UserInst
            {
                NomeInst = "Fatec",
                Email = "fatec@gmail.com",
                CNPJ = "111111111111",
                Senha = "Senha123"
            };

            await _usuarioInstRepository.AddUsuarioInst(user);

            var exists = await _usuarioInstRepository.UsuarioExistente("fatec@gmail.com");

            exists.Should().BeTrue();
        }

        [Fact]
        public async Task GetUserByEmail_ShoulReturnA_UserExistsByHisEmail()
        {
            var user = new UserInst
            {
                NomeInst = "Fatec",
                Email = "fatec@gmail.com",
                CNPJ = "111111111111",
                Senha = "Senha123"
            };

            await _usuarioInstRepository.AddUsuarioInst(user);

            var retrievedUser = await _usuarioInstRepository.GetUsuarioInstByEmail("fatec@gmail.com");
            retrievedUser.Should().NotBeNull();
            retrievedUser.Email.Should().Be("fatec@gmail.com");
            retrievedUser.NomeInst.Should().Be("Fatec");
        }

        [Fact]
        public async Task DeleteAInstUser_ShouldDeleteAUserExists()
        {
            var user = new UserInst
            {
                NomeInst = "Fatec",
                Email = "fatec@gmail.com",
                CNPJ = "111111111111",
                Senha = "Senha123"
            };

            await _usuarioInstRepository.AddUsuarioInst(user);

            await _usuarioInstRepository.Delete(user);

            var retrievedUser = await _context.UserInst.FirstOrDefaultAsync(u => u.Id == user.Id);

            retrievedUser.Should().BeNull();
        }
    }
}

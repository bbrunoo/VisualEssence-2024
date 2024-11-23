using Amazon.S3;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using VisualEssence.Domain.Models;
using VisualEssence.Infrastructure.Data;
using VisualEssenceAPI.Repositories;

namespace VisualEssenceTests.RepositoryTest
{
    public class UserPaisRepositoryTests : IDisposable
    {
        private readonly ApplicationDbContext _context;
        private readonly UsuarioPaisRepository _repository;
        private readonly IAmazonS3 _s3Client;

        public UserPaisRepositoryTests()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseSqlServer("Data Source=localhost\\SQLEXPRESS;Initial Catalog=PaisTeste;Integrated Security=True;Trust Server Certificate=True")
                .Options;

            _context = new ApplicationDbContext(options);
            _context.Database.EnsureDeleted();
            _context.Database.Migrate();

            _repository = new UsuarioPaisRepository(_context, _s3Client);

        }
        public void Dispose()
        {
            _context.Database.EnsureDeleted();
            _context.Dispose();
        }

        [Fact]
        public async Task AddUserPais_ShouldCreateANewUser()
        {
            var pais = new UserPais
            {
                Nome = "Bruno",
                Email = "bruno@gmail.com",
                Senha = "Bruno123"
            };

            var addedUser = await _repository.AddUsuarioPais(pais);

            var retrievedUser = await _context.UserPais.FirstOrDefaultAsync(u => u.Id == addedUser.Id);
            retrievedUser.Should().NotBeNull();
            retrievedUser.Nome.Should().Be("Bruno");
            retrievedUser.Email.Should().Be("bruno@gmail.com");
        }

        [Fact]
        public async Task ExistentsPaisUser_ShouldCheckIfAUserExists()
        {
            var user = new UserPais
            {
                Nome = "Bruno",
                Email = "bruno@gmail.com",
                Senha = "Senha123"
            };

            await _repository.AddUsuarioPais(user);

            var exists = await _repository.UsuarioExistente("bruno@gmail.com");

            exists.Should().BeTrue();
        }

        [Fact]
        public async Task GetUserByEmail_ShoulReturnA_UserExistsByHisEmail()
        {
            var user = new UserPais
            {
                Nome = "Bruno",
                Email = "bruno@gmail.com",
                Senha = "Senha123"
            };

            await _repository.AddUsuarioPais(user);

            var retrievedUser = await _repository.GetUsuarioByEmail("bruno@gmail.com");
            retrievedUser.Should().NotBeNull();
            retrievedUser.Email.Should().Be("bruno@gmail.com");
            retrievedUser.Nome.Should().Be("Bruno");
        }

        [Fact]
        public async Task DeleteAPaisUser_ShouldDeleteAUserExists()
        {
            var user = new UserPais
            {
                Nome = "Bruno",
                Email = "bruno@gmail.com",
                Senha = "Senha123"
            };

            await _repository.AddUsuarioPais(user);

            await _repository.Delete(user);

            var retrievedUser = await _context.UserPais.FirstOrDefaultAsync(u => u.Id == user.Id);

            retrievedUser.Should().BeNull();
        }
    }
}

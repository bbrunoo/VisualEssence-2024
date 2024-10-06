//using Microsoft.EntityFrameworkCore;
//using VisualEssence.Domain.Models;
//using VisualEssence.Infrastructure.Data;

//namespace VisualEssenceTests
//{
//    public class RepositoryTests
//    {
//        private readonly ApplicationDbContext _context;
//        public RepositoryTests()
//        {

//            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
//               .UseInMemoryDatabase(databaseName: "database")
//               .Options;

//            _context = new ApplicationDbContext(options);
//        }

//        [Fact]
//        public void Test_Add_New_UserInst()
//        {
//            //arrange
//            var newUser = new UserInst
//            {
//                Id = Guid.NewGuid(),
//                NomeInst = "Test Instituicao",
//                Email = "test@email.com",
//                CNPJ = "123456789",
//                SenhaHash = "AAAAAAAAAAAA",
//                SenhaSalt = new byte[] { },
//                IsAdmin = false
//            };

//            //act
//            _context.UserInst.Add(newUser);
//            _context.SaveChanges();

//            //assert
//            var userInDb = _context.UserInst.FirstOrDefault(u => u.Email == "test@email.com");
//            Assert.NotNull(userInDb);
//            Assert.Equal("Test Instituicao", userInDb.NomeInst);
//        }

//        [Fact]
//        public void Test_Update_UserInst()
//        {
//            // Arrange
//            var newUser = new UserInst
//            {
//                Id = Guid.NewGuid(),
//                NomeInst = "Test Instituicao",
//                Email = "test@email.com",
//                CNPJ = "123456789",
//                SenhaHash = new byte[] { },
//                SenhaSalt = new byte[] { },
//                IsAdmin = false
//            };

//            _context.UserInst.Add(newUser);
//            _context.SaveChanges();

//            // Act
//            var userToUpdate = _context.UserInst.FirstOrDefault(u => u.Email == "test@email.com");
//            userToUpdate.NomeInst = "Updated Instituicao";
//            _context.UserInst.Update(userToUpdate);
//            _context.SaveChanges();

//            // Assert
//            var updatedUser = _context.UserInst.FirstOrDefault(u => u.Email == "test@email.com");
//            Assert.NotNull(updatedUser);
//            Assert.Equal("Updated Instituicao", updatedUser.NomeInst);
//        }

//        [Fact]
//        public void Test_Delete_UserInst()
//        {
//            // Arrange
//            _context.UserInst.RemoveRange(_context.UserInst);
//            _context.SaveChanges();
//            var newUser = new UserInst
//            {
//                Id = Guid.NewGuid(),
//                NomeInst = "Test Instituicao",
//                Email = "test@email.com",
//                CNPJ = "123456789",
//                SenhaHash = new byte[] { },
//                SenhaSalt = new byte[] { },
//                IsAdmin = false
//            };

//            _context.UserInst.Add(newUser);
//            _context.SaveChanges();

//            // Act
//            var userToDelete = _context.UserInst.FirstOrDefault(u => u.Email == "test@email.com");
//            _context.UserInst.Remove(userToDelete);
//            _context.SaveChanges();

//            // Assert
//            var deletedUser = _context.UserInst.FirstOrDefault(u => u.Email == "test@email.com");
//            Assert.Null(deletedUser);
//        }

//        [Fact]
//        public void Test_GetAll_UserInst()
//        {
//            // Arrange
//            _context.UserInst.RemoveRange(_context.UserInst);
//            _context.SaveChanges();
//            var user1 = new UserInst
//            {
//                Id = Guid.NewGuid(),
//                NomeInst = "Instituicao 1",
//                Email = "inst1@email.com",
//                CNPJ = "111111111",
//                SenhaHash = new byte[] { },
//                SenhaSalt = new byte[] { },
//                IsAdmin = false
//            };

//            var user2 = new UserInst
//            {
//                Id = Guid.NewGuid(),
//                NomeInst = "Instituicao 2",
//                Email = "inst2@email.com",
//                CNPJ = "222222222",
//                SenhaHash = new byte[] { },
//                SenhaSalt = new byte[] { },
//                IsAdmin = false
//            };

//            _context.UserInst.Add(user1);
//            _context.UserInst.Add(user2);
//            _context.SaveChanges();

//            // Act
//            var allUsers = _context.UserInst.ToList();

//            // Assert
//            Assert.Equal(2, allUsers.Count);
//            Assert.Contains(allUsers, u => u.Email == "inst1@email.com");
//            Assert.Contains(allUsers, u => u.Email == "inst2@email.com");
//        }

//        [Fact]
//        public void Test_GetById_UserInst()
//        {
//            // Arrange
//            var newUser = new UserInst
//            {
//                Id = Guid.NewGuid(),
//                NomeInst = "Test Instituicao",
//                Email = "test@email.com",
//                CNPJ = "123456789",
//                SenhaHash = new byte[] { },
//                SenhaSalt = new byte[] { },
//                IsAdmin = false
//            };

//            _context.UserInst.Add(newUser);
//            _context.SaveChanges();

//            // Act
//            var userFromDb = _context.UserInst.FirstOrDefault(u => u.Id == newUser.Id);

//            // Assert
//            Assert.NotNull(userFromDb);
//            Assert.Equal(newUser.Email, userFromDb.Email);
//        }

//        [Fact]
//        public void Test_UniqueEmailConstraint()
//        {
//            // Arrange
//            var user1 = new UserInst
//            {
//                Id = Guid.NewGuid(),
//                NomeInst = "Instituicao 1",
//                Email = "unique@email.com",
//                CNPJ = "111111111",
//                SenhaHash = new byte[] { },
//                SenhaSalt = new byte[] { },
//                IsAdmin = false
//            };

//            _context.UserInst.Add(user1);
//            _context.SaveChanges();

//            var user2 = new UserInst
//            {
//                Id = Guid.NewGuid(),
//                NomeInst = "Instituicao 2",
//                Email = "unique@email.com", // mesmo email
//                CNPJ = "222222222",
//                SenhaHash = new byte[] { },
//                SenhaSalt = new byte[] { },
//                IsAdmin = false
//            };

//            // Act & Assert
//            Assert.Throws<DbUpdateException>(() =>
//            {
//                _context.UserInst.Add(user2);
//                _context.SaveChanges();
//            });
//        }
//    }
//}

using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;
using VisualEssence.Domain.DTOs;
using VisualEssence.Domain.Interfaces.NormalRepositories;
using VisualEssence.Domain.Models;
using VisualEssence.Infrastructure.Context;

namespace VisualEssenceAPI.Repositories
{
    public class UsuarioPaisRepository : IUsuarioPaisRepository
    {
        private readonly ApplicationDbContext _context;

        public UsuarioPaisRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<bool> UsuarioExistente(string email)
        {
            return await _context.UserPais.AnyAsync(e => e.Email == email);
        }

        public async Task<UserPais> AddUsuarioPais(UserPais userPais)
        {
            if (string.IsNullOrEmpty(userPais.Senha)) throw new ArgumentException("A senha deve ser fornecida.");

            using (var hmac = new HMACSHA512())
            {
                userPais.SenhaSalt = hmac.Key;
                userPais.SenhaHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(userPais.Senha));
            }

            await _context.UserPais.AddAsync(userPais);
            await _context.SaveChangesAsync();
            return userPais;
        }

        public async Task<UserPais> GetUsuarioByEmail(string email)
        {
            return await _context.UserPais.FirstOrDefaultAsync(e => e.Email == email);
        }

        public async Task<UserPais> GetUsuarioById(Guid id)
        {
            return await _context.UserPais.FindAsync(id);
        }

        public async Task<IEnumerable<UserPais>> GetUser()
        {
            return await _context.UserPais.ToListAsync();
        }

        public async Task<UserPais> Delete(UserPais userPais)
        {
            _context.UserPais.Remove(userPais);
            await _context.SaveChangesAsync();
            return userPais;
        }

        public async Task<bool> Exists(Guid id)
        {
            return await _context.UserPais.AnyAsync(e => e.Id == id);
        }
    }
}

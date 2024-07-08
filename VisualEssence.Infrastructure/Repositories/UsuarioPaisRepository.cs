using Microsoft.EntityFrameworkCore;
using VisualEssence.Domain.Interfaces;
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

        public async Task AddUsuarioPais(UserPais userPais)
        {
            await _context.AddAsync(userPais);
            await _context.SaveChangesAsync();
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
    }
}

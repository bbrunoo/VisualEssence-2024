using Microsoft.EntityFrameworkCore;
using VisualEssence.Domain.Interfaces;
using VisualEssence.Domain.Models;
using VisualEssence.Infrastructure.Context;

namespace VisualEssenceAPI.Repositories
{
    public class UsuarioInstRepository : IUsuarioInstRepository
    {
        private readonly ApplicationDbContext _context;

        public UsuarioInstRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task AddUsuarioInst(UserInst userInst)
        {
            await _context.UserInst.AddAsync(userInst);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> UsuarioExistente(string email)
        {
            return await _context.UserInst.AnyAsync(e => e.Email == email);
        }

        public async Task<UserInst> GetUsuarioInstByEmail(string email)
        {
            return await _context.UserInst.FirstOrDefaultAsync(e => e.Email == email);
        }

        public async Task<UserInst> GetUsuarioById(Guid id)
        {
            return await _context.UserInst.FindAsync(id);
        }

        public async Task<IEnumerable<UserInst>> GetUser()
        {
            return await _context.UserInst.ToListAsync();
        }
    }
}



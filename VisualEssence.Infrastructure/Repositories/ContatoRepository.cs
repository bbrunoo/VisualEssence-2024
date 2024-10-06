using Microsoft.EntityFrameworkCore;
using VisualEssence.Domain.Interfaces.NormalRepositories;
using VisualEssence.Domain.Models;
using VisualEssence.Infrastructure.Data;

namespace VisualEssenceAPI.Repositories
{
    public class ContatoRepository : IContatoRepository
    {

        private readonly ApplicationDbContext _context;

        public ContatoRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Contato> SendFeedback(Contato contato)
        {
            await _context.AddAsync(contato);
            await _context.SaveChangesAsync();
            return contato;
        }

        public async Task<IEnumerable<Contato>> GetContatos()
        {
            return await _context.Contato.ToListAsync();
        }
    }
}

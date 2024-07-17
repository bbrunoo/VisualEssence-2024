using Microsoft.EntityFrameworkCore;
using VisualEssence.Domain.Interfaces.Games;
using VisualEssence.Domain.Models;
using VisualEssence.Infrastructure.Context;

namespace VisualEssence.Infrastructure.Repositories.Games
{
    public class JogadaRepository : IMiopiaGameRepository
    {
        private readonly ApplicationDbContext _context;
        public JogadaRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<Jogada> Delete(Jogada entity)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Jogada>> GetAllAsync()
        { 

            return await _context.Jogada.ToListAsync();
        }

        public async Task<Jogada> GetByIdAsync(int id)
        {
            return await _context.Jogada.FindAsync(id);
        }

        public async Task<Jogada> Post(Jogada newJogada)
        {
            await _context.AddAsync(newJogada);
            await _context.SaveChangesAsync();
            return newJogada;
        }
        public async Task<Jogada> Update(Jogada entity)
        {
            throw new NotImplementedException();
        }
    }
}

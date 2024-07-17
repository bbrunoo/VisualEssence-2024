using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VisualEssence.Domain.DTOs.GamesDTO.NewGame;
using VisualEssence.Domain.Interfaces.Games.SystemGamesRepository;
using VisualEssence.Domain.Models;
using VisualEssence.Infrastructure.Context;

namespace VisualEssence.Infrastructure.Repositories.SystemGames
{
    public class SystemGamesRepository : ISystemGamesRepository
    {
        private readonly ApplicationDbContext _context;

        public SystemGamesRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Jogo>> GetAllAsync()
        {
            return await _context.Jogo.ToListAsync();
        }

        public async Task<Jogo> GetByIdAsync(int id)
        {
            return await _context.Jogo.FindAsync(id);
        }

        public async Task<Jogo> Post(JogoDTO newJogo)
        {
            var jogo = new Jogo()
            {
                Name = newJogo.Name
            };

            await _context.AddAsync(jogo);
            await _context.SaveChangesAsync();
            return jogo;
        }

        public async Task<Jogo> Delete(Jogo jogo)
        {
            _context.Jogo.Remove(jogo);
            await _context.SaveChangesAsync();
            return jogo;
        }
    }
}

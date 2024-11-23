﻿using Microsoft.EntityFrameworkCore;
using VisualEssence.Domain.DTOs.GamesDTO.NewGame;
using VisualEssence.Domain.Interfaces.Games.SystemGamesRepository;
using VisualEssence.Domain.Models;
using VisualEssence.Infrastructure.Data;

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
            var jogo = await _context.Jogo.FindAsync(id);
            if (jogo == null)
            {
                throw new KeyNotFoundException($"Jogo with ID {id} not found.");
            }
            return jogo;
        }

        public async Task<Jogo> Post(JogoDTO newJogo)
        {
            if (string.IsNullOrWhiteSpace(newJogo.Nome))
            {
                throw new ArgumentException("Nome is required.");
            }

            var jogo = new Jogo
            {
                Nome = newJogo.Nome
            };

            await _context.Jogo.AddAsync(jogo);
            await _context.SaveChangesAsync();
            return jogo;
        }

        public async Task<Jogo> Delete(Jogo jogo)
        {
            var jogoInData = await _context.Jogo.FindAsync(jogo.Id);
            if (jogoInData == null)
            {
                throw new KeyNotFoundException($"Jogo with ID {jogo.Id} not found.");
            }

            _context.Jogo.Remove(jogoInData);
            await _context.SaveChangesAsync();
            return jogoInData;
        }
    }
}

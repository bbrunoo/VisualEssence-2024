using Microsoft.EntityFrameworkCore;
using VisualEssence.Domain.DTOs.GamesDTO;
using VisualEssence.Domain.Interfaces.GenericRepository;
using VisualEssence.Domain.Interfaces.NormalRepositories;
using VisualEssence.Domain.Models;
using VisualEssence.Domain.Models.Jogada;
using VisualEssence.Infrastructure.Context;

namespace VisualEssence.Infrastructure.Repositories.Jogadas
{
    public class JogadaPaisRepository : IJogadaPaisRepository
    {
        private readonly ApplicationDbContext _context;

        public JogadaPaisRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<JogadaPais>> GetAllAsync()
        {
            return await _context.JogadaPais.ToListAsync();
        }

        public async Task<JogadaPais> GetByIdAsync(Guid id)
        {
            return await _context.JogadaPais.FindAsync(id);
        }

        public async Task<JogadaPaisDTO> Post(JogadaPaisDTO dto)
        {
            if (dto == null)
                throw new ArgumentNullException(nameof(dto));

            var criancaPais = await _context.CriancaPais.FindAsync(dto.IdCrianca);
            if (criancaPais == null)
                throw new KeyNotFoundException("Criança não encontrada.");

            var jogadaPais = new JogadaPais
            {
                IdJogo = dto.IdJogo,
                IdCrianca = dto.IdCrianca,
                Pontuacao = dto.Pontuacao,
                DataJogo = DateTime.UtcNow
            };

            _context.JogadaPais.Add(jogadaPais);
            await _context.SaveChangesAsync();

            return new JogadaPaisDTO
            {
                Id = jogadaPais.Id,
                IdJogo = jogadaPais.IdJogo,
                IdCrianca = jogadaPais.IdCrianca,
                Pontuacao = jogadaPais.Pontuacao,
                DataJogo = jogadaPais.DataJogo
            };
        }


        public async Task<JogadaPaisDTO> Update(Guid id, JogadaPaisDTO dto)
        {
            if (dto == null)
                throw new ArgumentNullException(nameof(dto));

            var jogadaPaisExistente = await _context.JogadaPais.FindAsync(id);
            if (jogadaPaisExistente == null)
                throw new KeyNotFoundException("JogadaPais não encontrada.");

            jogadaPaisExistente.IdJogo = dto.IdJogo;
            jogadaPaisExistente.IdCrianca = dto.IdCrianca;
            jogadaPaisExistente.Pontuacao = dto.Pontuacao;
            jogadaPaisExistente.DataJogo = dto.DataJogo;

            _context.JogadaPais.Update(jogadaPaisExistente);
            await _context.SaveChangesAsync();

            return new JogadaPaisDTO
            {
                IdJogo = jogadaPaisExistente.IdJogo,
                IdCrianca = jogadaPaisExistente.IdCrianca,
                Pontuacao = jogadaPaisExistente.Pontuacao,
                DataJogo = jogadaPaisExistente.DataJogo
            };
        }

        public async Task<JogadaPais> Delete(JogadaPais jogada)
        {
            if (jogada == null)
                throw new ArgumentNullException(nameof(jogada));

            var jogadaExistente = await _context.JogadaPais.FindAsync(jogada.Id);
            if (jogadaExistente == null)
                throw new KeyNotFoundException("JogadaPais não encontrada.");

            _context.JogadaPais.Remove(jogadaExistente);
            await _context.SaveChangesAsync();

            return jogadaExistente;
        }
    }
}

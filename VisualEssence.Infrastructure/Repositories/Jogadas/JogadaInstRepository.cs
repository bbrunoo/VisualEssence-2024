using Microsoft.EntityFrameworkCore;
using VisualEssence.Domain.DTOs.GamesDTO;
using VisualEssence.Domain.Interfaces.GenericRepository;
using VisualEssence.Domain.Interfaces.NormalRepositories;
using VisualEssence.Domain.Models;
using VisualEssence.Domain.Models.Jogada;
using VisualEssence.Infrastructure.Context;

namespace VisualEssence.Infrastructure.Repositories.Jogadas
{
    public class JogadaInstRepository : IJogadaInstRepository
    {
        private readonly ApplicationDbContext _context;

        public JogadaInstRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<JogadaInst>> GetAllAsync()
        {
            return await _context.JogadaInst.ToListAsync();
        }

        public async Task<JogadaInst> GetByIdAsync(Guid id)
        {
            return await _context.JogadaInst.FindAsync(id);
        }

        public async Task<JogadaInstDTO> Post(JogadaInstDTO dto)
        {
            if (dto == null)
                throw new ArgumentNullException(nameof(dto));

            var criancaInst = await _context.CriancaInst.FindAsync(dto.IdCrianca);
            if (criancaInst == null)
                throw new KeyNotFoundException("Criança não encontrada.");

            var jogadaInst = new JogadaInst
            {
                IdJogo = dto.IdJogo,
                IdCrianca = dto.IdCrianca,
                Pontuacao = dto.Pontuacao,
                DataJogo = DateTime.UtcNow,
                CriancaInst = criancaInst
            };

            _context.JogadaInst.Add(jogadaInst);
            await _context.SaveChangesAsync();

            return new JogadaInstDTO
            {
                IdJogo = jogadaInst.IdJogo,
                IdCrianca = jogadaInst.IdCrianca,
                Pontuacao = jogadaInst.Pontuacao,
                DataJogo = jogadaInst.DataJogo
            };
        }

        public async Task<JogadaInstDTO> Update(Guid id, JogadaInstDTO dto)
        {
            if (dto == null)
                throw new ArgumentNullException(nameof(dto));

            var jogadaInstExistente = await _context.JogadaInst.FindAsync(id);
            if (jogadaInstExistente == null)
                throw new KeyNotFoundException("JogadaInst não encontrada.");

            jogadaInstExistente.IdJogo = dto.IdJogo;
            jogadaInstExistente.IdCrianca = dto.IdCrianca;
            jogadaInstExistente.Pontuacao = dto.Pontuacao;
            jogadaInstExistente.DataJogo = dto.DataJogo;

            _context.JogadaInst.Update(jogadaInstExistente);
            await _context.SaveChangesAsync();

            return new JogadaInstDTO
            {
                IdJogo = jogadaInstExistente.IdJogo,
                IdCrianca = jogadaInstExistente.IdCrianca,
                Pontuacao = jogadaInstExistente.Pontuacao,
                DataJogo = jogadaInstExistente.DataJogo
            };
        }

        public async Task<JogadaInst> Delete(JogadaInst jogada)
        {
            if (jogada == null)
                throw new ArgumentNullException(nameof(jogada));

            var jogadaExistente = await _context.JogadaInst.FindAsync(jogada.Id);
            if (jogadaExistente == null)
                throw new KeyNotFoundException("JogadaInst não encontrada.");

            _context.JogadaInst.Remove(jogadaExistente);
            await _context.SaveChangesAsync();

            return jogadaExistente;
        }
    }
}

using Microsoft.EntityFrameworkCore;
using VisualEssence.Domain.DTOs;
using VisualEssence.Domain.DTOs.GamesDTO;
using VisualEssence.Domain.Interfaces.GenericRepository;
using VisualEssence.Domain.Interfaces.NormalRepositories;
using VisualEssence.Domain.Models;
using VisualEssence.Domain.Models.Jogada;
using VisualEssence.Infrastructure.Data;

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
                NomeJogo = dto.NomeJogo,
                IdCrianca = dto.IdCrianca,
                Pontuacao = dto.Pontuacao,
                DataJogo = DateTime.UtcNow,
                UserPaisId = dto.UserPaisId
            };

            _context.JogadaPais.Add(jogadaPais);
            await _context.SaveChangesAsync();

            return new JogadaPaisDTO
            {
                Id = jogadaPais.Id,
                NomeJogo = jogadaPais.NomeJogo,
                IdCrianca = jogadaPais.IdCrianca,
                Pontuacao = jogadaPais.Pontuacao,
                DataJogo = jogadaPais.DataJogo,
                UserPaisId = dto.UserPaisId
            };
        }


        public async Task<JogadaPaisDTO> Update(Guid id, JogadaPaisDTO dto)
        {
            if (dto == null)
                throw new ArgumentNullException(nameof(dto));

            var jogadaPaisExistente = await _context.JogadaPais.FindAsync(id);
            if (jogadaPaisExistente == null)
                throw new KeyNotFoundException("JogadaPais não encontrada.");

            jogadaPaisExistente.NomeJogo = dto.NomeJogo;
            jogadaPaisExistente.IdCrianca = dto.IdCrianca;
            jogadaPaisExistente.Pontuacao = dto.Pontuacao;
            jogadaPaisExistente.DataJogo = dto.DataJogo;

            _context.JogadaPais.Update(jogadaPaisExistente);
            await _context.SaveChangesAsync();

            return new JogadaPaisDTO
            {
                NomeJogo = jogadaPaisExistente.NomeJogo,
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

        public async Task<IEnumerable<HistoricoJogadasDTO>> ObterHistoricoPorNomeJogo(string nomeJogo, Guid userId)
        {
            var historicoJogadas = await _context.JogadaPais
                .Include(j => j.CriancaPais)
                .Where(j => j.NomeJogo == nomeJogo && j.UserPaisId == userId)
                .Select(j => new HistoricoJogadasDTO
                {
                    NomeCrianca = j.CriancaPais.Nome,
                    NomeJogo = j.NomeJogo,
                    DataJogo = j.DataJogo,
                    Pontuacao = j.Pontuacao,
                })
                .ToListAsync();

            return historicoJogadas;
        }


    }
}

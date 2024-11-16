using Amazon.S3;
using Amazon.S3.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using VisualEssence.Domain.DTOs;
using VisualEssence.Domain.DTOs.GamesDTO;
using VisualEssence.Domain.Interfaces.GenericRepository;
using VisualEssence.Domain.Interfaces.NormalRepositories;
using VisualEssence.Domain.Models;
using VisualEssence.Domain.Models.Jogada;
using VisualEssence.Infrastructure.Data;

namespace VisualEssence.Infrastructure.Repositories.Jogadas
{
    public class JogadaInstRepository : IJogadaInstRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IAmazonS3 _s3Client;
        private readonly string _bucketName;

        public JogadaInstRepository(ApplicationDbContext context, IAmazonS3 s3Client, IConfiguration configuration)
        {
            _context = context;
            _s3Client = s3Client;
            _bucketName = configuration["AWS:BucketName"];

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
                NomeJogo = dto.NomeJogo,
                IdCrianca = dto.IdCrianca,
                Pontuacao = dto.Pontuacao,
                DataJogo = DateTime.UtcNow,
                CriancaInst = criancaInst,
                UserInstId = dto.UserInstId
            };

            _context.JogadaInst.Add(jogadaInst);
            await _context.SaveChangesAsync();

            return new JogadaInstDTO
            {
                NomeJogo = jogadaInst.NomeJogo,
                IdCrianca = jogadaInst.IdCrianca,
                Pontuacao = jogadaInst.Pontuacao,
                DataJogo = jogadaInst.DataJogo,
                UserInstId = jogadaInst.UserInstId
            };
        }
        public async Task<JogadaInstDTO> Update(Guid id, JogadaInstDTO dto)
        {
            if (dto == null)
                throw new ArgumentNullException(nameof(dto));

            var jogadaInstExistente = await _context.JogadaInst.FindAsync(id);
            if (jogadaInstExistente == null)
                throw new KeyNotFoundException("JogadaInst não encontrada.");

            jogadaInstExistente.NomeJogo = dto.NomeJogo;
            jogadaInstExistente.IdCrianca = dto.IdCrianca;
            jogadaInstExistente.Pontuacao = dto.Pontuacao;
            jogadaInstExistente.DataJogo = dto.DataJogo;
            jogadaInstExistente.UserInstId = dto.UserInstId;

            _context.JogadaInst.Update(jogadaInstExistente);
            await _context.SaveChangesAsync();

            return new JogadaInstDTO
            {
                NomeJogo = jogadaInstExistente.NomeJogo,
                IdCrianca = jogadaInstExistente.IdCrianca,
                Pontuacao = jogadaInstExistente.Pontuacao,
                DataJogo = jogadaInstExistente.DataJogo,
                UserInstId = jogadaInstExistente.UserInstId,
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

        //public async Task<IEnumerable<HistoricoJogadasDTO>> ObterHistoricoPorFiltro(
        //string? nomeJogo,
        //string? nomeCrianca,
        //Guid userId,
        //int pageNumber,
        //int pageSize)
        //{
        //    var query = _context.JogadaInst
        //        .Include(j => j.CriancaInst)
        //        .Where(j => j.UserInstId == userId);

        //    if (!string.IsNullOrEmpty(nomeJogo))
        //    {
        //        query = query.Where(j => j.NomeJogo.Contains(nomeJogo));
        //    }

        //    if (!string.IsNullOrEmpty(nomeCrianca))
        //    {
        //        query = query.Where(j => j.CriancaInst.Nome.Contains(nomeCrianca));
        //    }

        //    var historicoJogadas = await query
        //        .OrderByDescending(j => j.DataJogo) 
        //        .Skip((pageNumber - 1) * pageSize)
        //        .Take(pageSize)
        //        .Select(j => new HistoricoJogadasDTO
        //        {
        //            NomeCrianca = j.CriancaInst.Nome,
        //            NomeJogo = j.NomeJogo,
        //            DataJogo = j.DataJogo,
        //            Pontuacao = j.Pontuacao,
        //        })
        //        .ToListAsync();

        //    return historicoJogadas;
        //}

        //public async Task<IEnumerable<HistoricoJogadasDTO>> ObterUltimosDoisJogosPorCrianca(Guid userId)
        //{
        //    var query = await _context.JogadaInst
        //        .Include(j => j.CriancaInst)
        //        .Where(j => j.UserInstId == userId)
        //        .ToListAsync();

        //    var historicoJogadas = query
        //        .GroupBy(j => j.IdCrianca)
        //        .SelectMany(g => g.OrderByDescending(j => j.DataJogo).Take(2))
        //        .OrderBy(j => j.CriancaInst.Nome)
        //        .Select(j => new HistoricoJogadasDTO
        //        {
        //            NomeCrianca = j.CriancaInst.Nome,
        //            NomeJogo = j.NomeJogo,
        //            DataJogo = j.DataJogo,
        //            Pontuacao = j.Pontuacao,
        //        });

        //    return historicoJogadas;
        //}


        //public async Task<IEnumerable<HistoricoJogadasDTO>> ObterHistoricoCompletoPorCrianca(
        //Guid userId,
        //Guid criancaId,
        //int pageNumber,
        //int pageSize)
        //{
        //    var query = _context.JogadaInst
        //        .Include(j => j.CriancaInst)
        //        .Where(j => j.UserInstId == userId && j.IdCrianca == criancaId)
        //        .OrderByDescending(j => j.DataJogo)
        //        .Skip((pageNumber - 1) * pageSize)
        //        .Take(pageSize)
        //        .Select(j => new HistoricoJogadasDTO
        //        {
        //            NomeCrianca = j.CriancaInst.Nome,
        //            NomeJogo = j.NomeJogo,
        //            DataJogo = j.DataJogo,
        //            Pontuacao = j.Pontuacao,
        //        });

        //    return await query.ToListAsync();
        //}

        public async Task<PaginatedResult<CriancaComJogosDTO>> ObterUltimosDoisJogosPorCrianca(
            Guid userId,
            int pageNumber,
            int pageSize,
            string? nomeJogo = null,
            string? nomeCrianca = null)
        {
            var criancaQuery = _context.CriancaInst.Where(c => c.UserInstId == userId);

            if (!string.IsNullOrEmpty(nomeCrianca))
            {
                criancaQuery = criancaQuery.Where(c => c.Nome.Contains(nomeCrianca));
            }

            var query = _context.JogadaInst
                .Include(j => j.CriancaInst)
                .ThenInclude(c => c.Sala)
                .Where(j => j.UserInstId == userId && criancaQuery.Any(c => c.Id == j.IdCrianca));

            if (!string.IsNullOrEmpty(nomeJogo))
            {
                query = query.Where(j => j.NomeJogo.Contains(nomeJogo));
            }

            var jogadas = await query.ToListAsync();

            var historicoJogadas = jogadas
                .GroupBy(j => j.IdCrianca)
                .Select(g => new CriancaComJogosDTO
                {
                    NomeCrianca = g.First().CriancaInst.Nome,
                    SalaNome = g.First().CriancaInst.Sala.Nome,
                    IdCrianca = g.First().CriancaInst.Id,
                    Foto = string.IsNullOrEmpty(g.First().CriancaInst.Foto) ? null : GeneratePreSignedUrl(g.First().CriancaInst.Foto),
                    Jogos = g.OrderByDescending(j => j.DataJogo)
                             .Take(2)
                             .Select(j => new HistoricoJogadasDTO
                             {
                                 NomeJogo = j.NomeJogo,
                                 DataJogo = j.DataJogo,
                                 Pontuacao = j.Pontuacao
                             })
                             .ToList()
                })
                .OrderBy(c => c.NomeCrianca);

            var paginatedResult = historicoJogadas
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            var totalCriancas = historicoJogadas.Count();
            var totalPages = (int)Math.Ceiling(totalCriancas / (double)pageSize);

            return new PaginatedResult<CriancaComJogosDTO>
            {
                Items = paginatedResult,
                TotalPages = totalPages
            };
        }

        public async Task<IDictionary<string, int>> CalcularQuantidadePorCategoriaAsync(Guid userId)
        {
            // Filtrar jogadas pela conta do usuário
            var jogadas = await _context.JogadaInst
                .Where(j => j.UserInstId == userId) // Filtra por UserInstId
                .Select(j => new
                {
                    j.NomeJogo,
                    j.IdCrianca,
                    j.Pontuacao
                })
                .ToListAsync();

            var resultado = new Dictionary<string, int>
    {
        { "MiopiaRuim", 0 },
        { "DaltonismoRuim", 0 },
        { "NenhumRisco", 0 }
    };

            foreach (var jogada in jogadas)
            {
                if (jogada.NomeJogo == "Miopia" && jogada.Pontuacao < 10)
                {
                    resultado["MiopiaRuim"]++;
                }
                else if ((jogada.NomeJogo == "Daltonismo" || jogada.NomeJogo == "Figuras Coloridas") && jogada.Pontuacao < 10)
                {
                    resultado["DaltonismoRuim"]++;
                }
                else
                {
                    resultado["NenhumRisco"]++;
                }
            }

            return resultado;
        }

        public async Task<List<JogadaDetalhadaDTO>> ObterJogadasPorCrianca(Guid idCrianca)
        {
            var resultado = await _context.JogadaInst
               .Include(j => j.CriancaInst)
               .Include(j => j.CriancaInst.Sala)
               .Where(j => j.CriancaInst.Id == idCrianca)
               .GroupBy(j => j.CriancaInst.Id)
               .Select(grupo => new JogadaDetalhadaDTO
               {
                   Nome = grupo.First().CriancaInst.Nome,
                   DataNascimento = grupo.First().CriancaInst.DataNascimento,
                   NomeResponsavel = grupo.First().CriancaInst.NomeResp,
                   SalaNome = grupo.First().CriancaInst.Sala.Nome,
                   Foto = grupo.First().CriancaInst.Foto,
                   Jogadas = grupo
                       .OrderByDescending(jogada => jogada.DataJogo)
                       .Select(jogada => new JogadaGetDTO
                       {
                           NomeJogo = jogada.NomeJogo,
                           Pontuacao = jogada.Pontuacao,
                           DataJogo = jogada.DataJogo
                       })
                       .ToList()
               })
               .ToListAsync();

            return resultado;
        }


        private string GeneratePreSignedUrl(string fotoKey)
        {
            var urlRequest = new GetPreSignedUrlRequest
            {
                BucketName = _bucketName,
                Key = fotoKey,
                Expires = DateTime.UtcNow.AddMinutes(5)
            };

            return _s3Client.GetPreSignedURL(urlRequest);
        }
    }
}

using VisualEssence.Domain.DTOs;
using VisualEssence.Domain.DTOs.GamesDTO;
using VisualEssence.Domain.Interfaces.GenericRepository;
using VisualEssence.Domain.Models.Jogada;

namespace VisualEssence.Domain.Interfaces.NormalRepositories
{
    public interface IJogadaInstRepository : IRepository<JogadaInst, JogadaInstDTO>
    {
        //Task<IEnumerable<HistoricoJogadasDTO>> ObterHistoricoPorFiltro(string? nomeJogo, string? nomeCrianca, Guid userId, int pageNumber, int pageSize);
        //Task<IEnumerable<HistoricoJogadasDTO>> ObterHistoricoDoisUltimosJogosPorCrianca(
        //Guid userId,
        //int pageNumber,
        //int pageSize);
        //Task<IEnumerable<HistoricoJogadasDTO>> ObterHistoricoCompletoPorCrianca(
        //Guid userId,
        //Guid criancaId,
        //int pageNumber,
        //int pageSize);

        //Task<IEnumerable<HistoricoJogadasDTO>> ObterUltimoJogoPorCrianca(Guid userId);

        //Task<IEnumerable<HistoricoJogadasDTO>> ObterUltimosDoisJogosPorCrianca(Guid userId);

        Task<IDictionary<string, int>> CalcularQuantidadePorCategoriaAsync(Guid userId);
        Task<PaginatedResult<CriancaComJogosDTO>> ObterUltimosDoisJogosPorCrianca(
        Guid userId,
        int pageNumber,
        int pageSize,
        string? nomeJogo = null,
        string? nomeCrianca = null);
    }
}

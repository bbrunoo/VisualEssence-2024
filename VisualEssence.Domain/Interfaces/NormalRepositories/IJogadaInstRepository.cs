using VisualEssence.Domain.DTOs;
using VisualEssence.Domain.DTOs.GamesDTO;
using VisualEssence.Domain.Interfaces.GenericRepository;
using VisualEssence.Domain.Models.Jogada;

namespace VisualEssence.Domain.Interfaces.NormalRepositories
{
    public interface IJogadaInstRepository : IRepository<JogadaInst, JogadaInstDTO>
    {
        Task<List<JogadaDetalhadaDTO>> ObterJogadasPorCrianca(Guid idCrianca);
        Task<IDictionary<string, int>> CalcularQuantidadePorCategoriaAsync(Guid userId);
        Task<PaginatedResult<CriancaComJogosDTO>> ObterUltimosDoisJogosPorCrianca(
        Guid userId,
        int pageNumber,
        int pageSize,
        string? nomeJogo = null,
        string? nomeCrianca = null);
    }
}

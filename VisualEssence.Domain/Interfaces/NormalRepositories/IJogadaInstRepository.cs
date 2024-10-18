using VisualEssence.Domain.DTOs.GamesDTO;
using VisualEssence.Domain.Interfaces.GenericRepository;
using VisualEssence.Domain.Models;
using VisualEssence.Domain.Models.Jogada;

namespace VisualEssence.Domain.Interfaces.NormalRepositories
{
    public interface IJogadaInstRepository : IRepository<JogadaInst, JogadaInstDTO>
    {
        Task<IEnumerable<JogadaInst>> ObterHistoricoPorNomeJogo(string nomeJogo, Guid userId);
    }
}

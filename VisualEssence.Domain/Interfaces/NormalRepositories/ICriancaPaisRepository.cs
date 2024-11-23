using VisualEssence.Domain.DTOs;
using VisualEssence.Domain.Interfaces.GenericRepository;
using VisualEssence.Domain.Models;

namespace VisualEssence.Domain.Interfaces.NormalRepositories
{
    public interface ICriancaPaisRepository : IRepository<CriancaPais, CriancaPaisDTO>
    {
        Task<IEnumerable<CriancaPais>> GetAllByUserIdAsync(Guid userId);
        Task<CriancaPais> PostCrianca(CriancaPais crianca);
    }
}

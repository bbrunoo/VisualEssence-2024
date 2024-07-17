using VisualEssence.Domain.Interfaces.GenericRepository;
using VisualEssence.Domain.Models;

namespace VisualEssence.Domain.Interfaces.NormalRepositories
{
    public interface IContatoRepository
    {
        Task<Contato> SendFeedback(Contato contato);
        Task<IEnumerable<Contato>> GetContatos();
    }
}

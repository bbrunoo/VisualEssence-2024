

using VisualEssence.Domain.DTOs;
using VisualEssence.Domain.Models;

namespace VisualEssence.Domain.Interfaces
{
    public interface IContatoRepository
    {
        Task<Contato> SendFeedback(Contato contato);
        Task<IEnumerable<Contato>> GetContatos();
    }
}

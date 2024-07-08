using VisualEssence.Domain.Models;

namespace VisualEssence.Domain.Interfaces
{
    public interface IUsuarioInstRepository
    {
        Task AddUsuarioInst(UserInst userInst);
        Task<bool> UsuarioExistente(string email);
        Task<UserInst> GetUsuarioInstByEmail(string email);
        Task<UserInst> GetUsuarioById(Guid id);
        Task<IEnumerable<UserInst>> GetUser();
    }
}

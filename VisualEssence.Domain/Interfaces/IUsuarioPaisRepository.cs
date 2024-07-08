using VisualEssence.Domain.Models;

namespace VisualEssence.Domain.Interfaces
{
    public interface IUsuarioPaisRepository
    {
        Task AddUsuarioPais(UserPais userpais);
        Task<bool> UsuarioExistente(string email);
        Task<UserPais> GetUsuarioByEmail (string email);
        Task<UserPais> GetUsuarioById(Guid id);
        Task<IEnumerable<UserPais>> GetUser();

    }
}

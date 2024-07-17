using VisualEssence.Domain.DTOs;
using VisualEssence.Domain.Interfaces.GenericRepository;
using VisualEssence.Domain.Models;

namespace VisualEssence.Domain.Interfaces.NormalRepositories
{
    public interface IUsuarioPaisRepository
    {
        Task<UserPais> AddUsuarioPais(UserPais userpais);
        Task<bool> UsuarioExistente(string email);
        Task<UserPais> GetUsuarioByEmail(string email);
        Task<UserPais> GetUsuarioById(Guid id);
        Task<IEnumerable<UserPais>> GetUser();
        Task<UserPais> Delete(UserPais userPais);
        Task<bool> Exists(Guid id);



    }
}

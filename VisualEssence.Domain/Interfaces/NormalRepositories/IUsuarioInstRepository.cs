using VisualEssence.Domain.DTOs;
using VisualEssence.Domain.Interfaces.GenericRepository;
using VisualEssence.Domain.Models;

namespace VisualEssence.Domain.Interfaces.NormalRepositories
{
    public interface IUsuarioInstRepository
    {
        Task<UserInst> AddUsuarioInst(UserInst userInst);
        Task<bool> UsuarioExistente(string email);
        Task<UserInst> GetUsuarioInstByEmail(string email);
        Task<EditUserInstDTO> UpdateUserInst(Guid id, EditUserInstDTO userDto);
        Task<UserInst> GetUsuarioById(Guid id);
        Task<IEnumerable<UserInst>> GetUser();
        Task<UserInst> Delete(UserInst userInst);
        Task<bool> Exists(Guid id);
    }
}

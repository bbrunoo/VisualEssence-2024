using Microsoft.AspNetCore.Http;
using VisualEssence.Domain.DTOs;
using VisualEssence.Domain.Models;

namespace VisualEssence.Domain.Interfaces.NormalRepositories
{
    public interface IUsuarioInstRepository
    {
        Task<UserInst> AddUsuarioInst(UserInst userInst);
        Task<bool> UsuarioExistente(string email);
        Task<UserInst> GetUsuarioInstByEmail(string email);
        Task<EditUserInstDTO> UpdateUserInst(Guid id, EditUserInstDTO userDto);
        Task<UserInstDTO> GetUsuarioById(Guid id);
        Task<IEnumerable<UserInst>> GetUser();
        Task<UserInst> Delete(UserInst userInst);
        Task<UserInst> GetUsuarioByIdForDelete(Guid id);
        Task<bool> Exists(Guid id);
        Task<bool> UploadFotoAsync(Guid userId, IFormFile file, string bucketName);
        Task<string> GetFotoUrlAsync(Guid userId, string bucketName);
    }
}

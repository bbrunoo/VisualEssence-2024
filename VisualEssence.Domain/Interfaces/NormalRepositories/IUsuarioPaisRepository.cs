using Microsoft.AspNetCore.Http;
using VisualEssence.Domain.DTOs;
using VisualEssence.Domain.Models;

namespace VisualEssence.Domain.Interfaces.NormalRepositories
{
    public interface IUsuarioPaisRepository
    {
        Task<UserPais> AddUsuarioPais(UserPais userpais);
        Task<bool> UsuarioExistente(string email);
        Task<EditUserPaisDTO> UpdateUserPais(Guid id, EditUserPaisDTO userDto);
        Task<UserPais> GetUsuarioByEmail(string email);
        Task<UserPais> GetUsuarioById(Guid id);
        Task<IEnumerable<UserPais>> GetUser();
        Task<UserPais> Delete(UserPais userPais);
        Task<bool> Exists(Guid id);
        Task<bool> UploadFotoAsync(Guid userId, IFormFile file, string bucketName);
        Task<string> GetFotoUrlAsync(Guid userId, string bucketName);
    }
}

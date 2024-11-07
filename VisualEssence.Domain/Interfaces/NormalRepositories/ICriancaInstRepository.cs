using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VisualEssence.Domain.DTOs;
using VisualEssence.Domain.Interfaces.GenericRepository;
using VisualEssence.Domain.Models;

namespace VisualEssence.Domain.Interfaces.NormalRepositories
{
    public interface ICriancaInstRepository : IRepository<CriancaInst, CriancaInstDTO>
    {
        Task<IEnumerable<CriancaInst>> GetCriancasByQuery(Guid? idSala, string? codigo, string? nomeCrianca, Guid userId);
        Task<CriancaInst> PostCrianca(CriancaInst crianca);
        Task<CriancaInst> UpdateCrianca(Guid id, CriancaInst crianca);
        Task<bool> UploadFotoAsync(Guid criancaId, IFormFile file, string bucketName);
        Task<string> GetFotoUrlAsync(Guid criancaId, string bucketName);
        Task<IEnumerable<CriancaInst>> GetAllByUserIdAsync(Guid userId);
        Task<CriancaInst> GetByIdAsyncUser(Guid id);
        //Task<IEnumerable<CriancaComJogadasDTO>> GetAllCriancasComJogadasByUserIdAsync(Guid userId);
    }
}

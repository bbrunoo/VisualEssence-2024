using Amazon.S3;
using Amazon.S3.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Data;
using VisualEssence.Domain.DTOs;
using VisualEssence.Domain.Interfaces.NormalRepositories;
using VisualEssence.Domain.Models;
using VisualEssence.Infrastructure.Data;

namespace VisualEssence.Infrastructure.Repositories
{
    public class CriancaInstRepository : ICriancaInstRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IAmazonS3 _s3Client;
        
        public CriancaInstRepository(ApplicationDbContext context, IAmazonS3 s3Client)
        {
            _context = context;
            _s3Client = s3Client;
        }
        public async Task<IEnumerable<CriancaInst>> GetAllAsync()
        {
            return await _context.CriancaInst.Include(c => c.Sala).ToListAsync();
        }
        public async Task<CriancaInst> GetByIdAsync(Guid id)
        {
            return await _context.CriancaInst.Include(c => c.Sala).FirstOrDefaultAsync(e => e.Id == id);
        }
        public async Task<IEnumerable<CriancaInst>> GetAllByUserIdAsync(Guid userId)
        {
            return await _context.CriancaInst
                .Include(c => c.Sala)
                .Include(c => c.JogadaInst)
                .Where(c => c.UserInstId == userId)
                .ToListAsync();
        }
        public async Task<CriancaInst> PostCrianca(CriancaInst crianca)
        {
            bool isUsuarioInstitucional = await _context.UserInst.AnyAsync(u => u.Id == crianca.UserInstId);
            if (!isUsuarioInstitucional)
            {
                throw new Exception("Usuário não encontrado.");
            }

            var sala = await _context.Sala.FindAsync(crianca.IdSala);
            if (sala == null)
            {
                throw new Exception("Sala não encontrada.");
            }

            var numCriancasNaSala = await _context.CriancaInst.CountAsync(c => c.IdSala == sala.Id);
            if (numCriancasNaSala >= sala.Capacidade)
            {
                throw new Exception("Capacidade máxima da sala atingida. Não é possível adicionar a criança.");
            }

            _context.CriancaInst.Add(crianca);
            await _context.SaveChangesAsync();

            return crianca;
        }
        public async Task<CriancaInstDTO> Update(Guid id, CriancaInstDTO criancaDto)
        {
            throw new NotImplementedException();
        }
        public async Task<CriancaInst> Delete(CriancaInst crianca)
        {
            var sala = await _context.Sala.FindAsync(crianca.IdSala);
            if (sala != null)
            {
                sala.CriancaInst.Remove(crianca);
            }
            _context.CriancaInst.Remove(crianca);
            await _context.SaveChangesAsync();
            return crianca;
        }
        public async Task<IEnumerable<CriancaInst>> GetCriancasByQuery(Guid? idSala, string? codigo, string? nomeCrianca, Guid userId)
        {
            var query = _context.CriancaInst.Where(c => c.UserInstId == userId);

            if (idSala.HasValue)
            {
                query = query.Where(c => c.IdSala == idSala.Value);
            }

            if (!string.IsNullOrEmpty(codigo))
            {
                query = query.Where(c => c.Cns.Contains(codigo));
            }

            if (!string.IsNullOrEmpty(nomeCrianca))
            {
                query = query.Where(c => c.Nome.Contains(nomeCrianca));
            }

            return await query.ToListAsync();
        }
        public Task<CriancaInstDTO> Post(CriancaInstDTO dto)
        {
            throw new NotImplementedException();
        }
        public async Task<CriancaInst> UpdateCrianca(Guid id, CriancaInst criancaInst)
        {
            Console.WriteLine($"Atualizando criança com ID: {id}");
            Console.WriteLine($"ID da Sala no DTO: {criancaInst.IdSala}");


            var crianca = await _context.CriancaInst
               .Include(c => c.Sala)
               .FirstOrDefaultAsync(c => c.Id == id);

            if (crianca == null)
            {
                throw new KeyNotFoundException("Criança não encontrada.");
            }

            var novaSala = await _context.Sala.FindAsync(criancaInst.IdSala);
            if (novaSala == null)
            {
                throw new KeyNotFoundException("Sala não encontrada.");
            }

            if (crianca.IdSala != criancaInst.IdSala)
            {
                var numCriancasNaNovaSala = await _context.CriancaInst.CountAsync(c => c.IdSala == criancaInst.IdSala);
                if (numCriancasNaNovaSala >= novaSala.Capacidade)
                {
                    throw new Exception("Capacidade máxima da nova sala atingida. Não é possível mover a criança para esta sala.");
                }

                if (crianca.Sala != null)
                {
                    crianca.Sala.CriancaInst.Remove(crianca);
                }

                crianca.IdSala = criancaInst.IdSala;
                crianca.Sala = novaSala;
            }

            crianca.Nome = criancaInst.Nome;
            crianca.Sexo = criancaInst.Sexo;
            crianca.NomeResp = criancaInst.NomeResp;
            crianca.Cpf = criancaInst.Cpf;
            crianca.Cns = criancaInst.Cns;
            crianca.DataNascimento = criancaInst.DataNascimento;
            crianca.Endereco = criancaInst.Endereco;
            crianca.Rg = criancaInst.Rg;
            crianca.Tel1 = criancaInst.Tel1;
            crianca.Tel2 = criancaInst.Tel2;

            _context.CriancaInst.Update(crianca);
            await _context.SaveChangesAsync();
            return criancaInst;
        }
        public async Task<bool> UploadFotoAsync(Guid criancaId, IFormFile file, string bucketName)
        {
            var crianca = await _context.CriancaInst.FirstOrDefaultAsync(c => c.Id == criancaId);
            if (crianca == null)
            {
                throw new KeyNotFoundException("Criança não encontrada.");
            }

            var bucketExist = await Amazon.S3.Util.AmazonS3Util.DoesS3BucketExistV2Async(_s3Client, bucketName);
            if (!bucketExist) throw new Exception($"Bucket {bucketName} não existe.");

            if (!string.IsNullOrEmpty(crianca.Foto))
            {
                var deleteRequest = new DeleteObjectRequest
                {
                    BucketName = bucketName,
                    Key = crianca.Foto
                };
                await _s3Client.DeleteObjectAsync(deleteRequest);
            }

            var key = $"{criancaId}/{file.FileName}";

            var request = new PutObjectRequest
            {
                BucketName = bucketName,
                Key = key,
                InputStream = file.OpenReadStream()
            };
            request.Metadata.Add("Content-Type", file.ContentType);
            await _s3Client.PutObjectAsync(request);

            crianca.Foto = key;
            _context.CriancaInst.Update(crianca);
            await _context.SaveChangesAsync();

            return true;
        }
        public async Task<string> GetFotoUrlAsync(Guid criancaId, string bucketName)
        {
            var crianca = await _context.CriancaInst.FirstOrDefaultAsync(c => c.Id == criancaId);
            if (crianca == null || string.IsNullOrEmpty(crianca.Foto))
            {
                throw new KeyNotFoundException("Criança ou imagem não encontrada.");
            }

            var urlRequest = new GetPreSignedUrlRequest
            {
                BucketName = bucketName,
                Key = crianca.Foto,
                Expires = DateTime.UtcNow.AddMinutes(5) 
            };

            var url = _s3Client.GetPreSignedURL(urlRequest);
            return url;
        }
        public Task<CriancaInst> GetByIdAsyncUser(Guid id)
        {
            throw new NotImplementedException();
        }

        public async Task<CriancaDTO> ObterCriancaComSalaAsync(Guid idCrianca)
        {
            var crianca = await _context.CriancaInst
                .Include(c => c.JogadaInst)
                .Include(c => c.Sala) 
                .FirstOrDefaultAsync(c => c.Id == idCrianca);

            if (crianca == null)
                throw new Exception("Criança não encontrada.");

            return new CriancaDTO
            {
                IdCrianca = crianca.Id,
                Foto = $"{crianca.Id}/CELULAR.png", 
                Nome = crianca.Nome,
                Jogadas = new List<object>(), 
                Sala = new SalaViewModel
                {
                    NomeSala = crianca.Sala?.Nome 
                }
            };
        }
    }
}

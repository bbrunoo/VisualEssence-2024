using Amazon.S3;
using Amazon.S3.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;
using VisualEssence.Domain.DTOs;
using VisualEssence.Domain.Interfaces.NormalRepositories;
using VisualEssence.Domain.Models;
using VisualEssence.Infrastructure.Data;

namespace VisualEssenceAPI.Repositories
{
    public class UsuarioInstRepository : IUsuarioInstRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IAmazonS3 _s3Client;

        public UsuarioInstRepository(ApplicationDbContext context, IAmazonS3 s3Client)
        {
            _context = context;
            _s3Client = s3Client;
        }

        public async Task<UserInst> AddUsuarioInst(UserInst userInst)
        {
            if (string.IsNullOrEmpty(userInst.Senha))
            {
                throw new ArgumentException("A senha deve ser fornecida.");
            }
            using (var hmac = new HMACSHA512())
            {
                userInst.SenhaSalt = hmac.Key;
                userInst.SenhaHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(userInst.Senha));
            }
            await _context.UserInst.AddAsync(userInst);
            await _context.SaveChangesAsync();
            return userInst;
        }
        public async Task<bool> UsuarioExistente(string email)
        {
            return await _context.UserInst.AnyAsync(e => e.Email == email);
        }
        public async Task<UserInst> GetUsuarioInstByEmail(string email)
        {
            return await _context.UserInst.FirstOrDefaultAsync(e => e.Email == email);
        }
        public async Task<UserInstDTO> GetUsuarioById(Guid id)
        {
            var user = await _context.UserInst.FirstOrDefaultAsync(c => c.Id == id);
            var userDto = new UserInstDTO
            {
                Id = user.Id,
                NomeInst = user.NomeInst,
                Email = user.Email,
                CNPJ = user.CNPJ,
                Foto = user.Foto,
            };

            return userDto;
        }
        public async Task<IEnumerable<UserInst>> GetUser()
        {
            return await _context.UserInst.ToListAsync();
        }
        public async Task<UserInst> Delete(UserInst userInst)
        {
            _context.UserInst.Remove(userInst);
            await _context.SaveChangesAsync();
            return userInst;
        }

        public async Task<UserInst> GetUsuarioByIdForDelete(Guid id)
        {
            return await _context.UserInst.FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task<bool> Exists(Guid id)
        {
            return await _context.UserInst.AnyAsync(e => e.Id == id);
        }
        public async Task<EditUserInstDTO> UpdateUserInst(Guid id, EditUserInstDTO userDto)
        {
            var usuarioExistente = await _context.UserInst.FirstOrDefaultAsync(c => c.Id == id);
            if (usuarioExistente == null) { throw new KeyNotFoundException("Usuario nao encontrado"); }

            usuarioExistente.NomeInst = userDto.NomeInst;
            usuarioExistente.CNPJ = userDto.CNPJ;
            usuarioExistente.Email = userDto.Email;

            _context.UserInst.Update(usuarioExistente);
            await _context.SaveChangesAsync();
            return userDto;
        }
        public async Task<bool> UploadFotoAsync(Guid userId, IFormFile file, string bucketName)
        {
            var user = await _context.UserInst.FirstOrDefaultAsync(c => c.Id == userId);
            if (user == null)
            {
                throw new KeyNotFoundException("Criança não encontrada.");
            }

            var bucketExist = await Amazon.S3.Util.AmazonS3Util.DoesS3BucketExistV2Async(_s3Client, bucketName);
            if (!bucketExist) throw new Exception($"Bucket {bucketName} não existe.");

            if (!string.IsNullOrEmpty(user.Foto))
            {
                var deleteRequest = new DeleteObjectRequest
                {
                    BucketName = bucketName,
                    Key = user.Foto
                };
                await _s3Client.DeleteObjectAsync(deleteRequest);
            }

            var key = $"{userId}/{file.FileName}";

            var request = new PutObjectRequest
            {
                BucketName = bucketName,
                Key = key,
                InputStream = file.OpenReadStream()
            };
            request.Metadata.Add("Content-Type", file.ContentType);
            await _s3Client.PutObjectAsync(request);

            user.Foto = key;
            _context.UserInst.Update(user);
            await _context.SaveChangesAsync();

            return true;
        }
        public async Task<string> GetFotoUrlAsync(Guid userId, string bucketName)
        {
            var user = await _context.UserInst.FirstOrDefaultAsync(c => c.Id == userId);
            if (user == null || string.IsNullOrEmpty(user.Foto))
            {
                throw new KeyNotFoundException("Criança ou imagem não encontrada.");
            }

            var urlRequest = new GetPreSignedUrlRequest
            {
                BucketName = bucketName,
                Key = user.Foto,
                Expires = DateTime.UtcNow.AddMinutes(5)
            };

            var url = _s3Client.GetPreSignedURL(urlRequest);
            return url;
        }
    }
}



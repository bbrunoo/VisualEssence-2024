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
    public class UsuarioPaisRepository : IUsuarioPaisRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IAmazonS3 _s3Client;

        public UsuarioPaisRepository(ApplicationDbContext context, IAmazonS3 s3Client)
        {
            _context = context;
            _s3Client = s3Client;
        }

        public async Task<bool> UsuarioExistente(string email)
        {
            return await _context.UserPais.AnyAsync(e => e.Email == email);
        }

        public async Task<UserPais> AddUsuarioPais(UserPais userPais)
        {
            if (string.IsNullOrEmpty(userPais.Senha)) throw new ArgumentException("A senha deve ser fornecida.");

            using (var hmac = new HMACSHA512())
            {
                userPais.SenhaSalt = hmac.Key;
                userPais.SenhaHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(userPais.Senha));
            }

            await _context.UserPais.AddAsync(userPais);
            await _context.SaveChangesAsync();
            return userPais;
        }

        public async Task<UserPais> GetUsuarioByEmail(string email)
        {
            return await _context.UserPais.FirstOrDefaultAsync(e => e.Email == email);
        }

        public async Task<UserPais> GetUsuarioById(Guid id)
        {
            return await _context.UserPais.FindAsync(id);
        }

        public async Task<IEnumerable<UserPais>> GetUser()
        {
            return await _context.UserPais.ToListAsync();
        }

        public async Task<UserPais> Delete(UserPais userPais)
        {
            _context.UserPais.Remove(userPais);
            await _context.SaveChangesAsync();
            return userPais;
        }

        public async Task<bool> Exists(Guid id)
        {
            return await _context.UserPais.AnyAsync(e => e.Id == id);
        }

        public async Task<EditUserPaisDTO> UpdateUserPais(Guid id, EditUserPaisDTO userDto)
        {
            var usuarioExistente = await _context.UserPais.FirstOrDefaultAsync(c => c.Id == id);
            if (usuarioExistente == null) { throw new KeyNotFoundException("Usuario nao encontrado"); }

            usuarioExistente.Nome = userDto.Nome;
            usuarioExistente.Email = userDto.Email;

            _context.UserPais.Update(usuarioExistente);
            await _context.SaveChangesAsync();
            return userDto;
        }
        public async Task<bool> UploadFotoAsync(Guid userId, IFormFile file, string bucketName)
        {
            var user = await _context.UserPais.FirstOrDefaultAsync(c => c.Id == userId);
            if (user == null)
            {
                throw new KeyNotFoundException("user não encontrado.");
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
            _context.UserPais.Update(user);
            await _context.SaveChangesAsync();

            return true;
        }
        public async Task<string> GetFotoUrlAsync(Guid userId, string bucketName)
        {
            var user = await _context.UserPais.FirstOrDefaultAsync(c => c.Id == userId);
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

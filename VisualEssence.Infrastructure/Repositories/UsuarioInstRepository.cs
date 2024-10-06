using Microsoft.AspNetCore.Http.Features;
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
        

        public UsuarioInstRepository(ApplicationDbContext context)
        {
            _context = context;
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

        public async Task<UserInst> GetUsuarioById(Guid id)
        {
            return await _context.UserInst.FindAsync(id);
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

        public async Task<bool> Exists(Guid id)
        {
            return await _context.UserInst.AnyAsync(e => e.Id == id);
        }

        public async Task<EditUserInstDTO> UpdateUserInst(Guid id, EditUserInstDTO userDto)
        {
            var usuarioExistente = await _context.UserInst.FirstOrDefaultAsync(c=>c.Id == id);
            if (usuarioExistente == null) { throw new KeyNotFoundException("Usuario nao encontrado"); }

            usuarioExistente.NomeInst = userDto.NomeInst;
            usuarioExistente.CNPJ = userDto.CNPJ;
            usuarioExistente.Email = userDto.Email;
            
            _context.UserInst.Update(usuarioExistente);
            await _context.SaveChangesAsync();
            return userDto;
        }
    }
}



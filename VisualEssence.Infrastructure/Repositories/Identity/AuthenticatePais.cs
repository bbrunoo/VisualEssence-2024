using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using VisualEssence.Domain.DTOs;
using VisualEssence.Domain.Interfaces.Authenticate;
using VisualEssence.Domain.Models;
using VisualEssence.Infrastructure.Context;

namespace VisualEssence.Infrastructure.Repositories.Identity
{
    public class AuthenticatePais : IAuthenticatePais
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;
        public AuthenticatePais(ApplicationDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public async Task<bool> AuthenticateAsync(string email, string senha)
        {
            var usuario = await _context.UserPais.Where(x => x.Email.ToLower() == email.ToLower()).FirstOrDefaultAsync();
            if (usuario == null) return false;

            if (usuario.SenhaSalt.Length != 128 || usuario.SenhaHash.Length != 64)
            {
                Console.WriteLine("Tamanho inválido de salt ou hash.");
                return false;
            }

            using (var hmac = new HMACSHA512(usuario.SenhaSalt))
            {
                var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(senha));

                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != usuario.SenhaHash[i])
                    {
                        return false;
                    }
                }
            }
            return true;
        }

        public string GenerateToken(Guid id, string email)
        {
            var claims = new[]
            {
                new Claim("id", id.ToString()),
                new Claim("email", email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var privateKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["jwt:secretKey"]));

            var credentials = new SigningCredentials(privateKey, SecurityAlgorithms.HmacSha256);

            var expiration = DateTime.UtcNow.AddMinutes(10);

            JwtSecurityToken token = new JwtSecurityToken(
                issuer: _configuration["jwt:issuer"],
                audience: _configuration["jwt:audience"],
                claims: claims,
                expires: expiration,
                signingCredentials: credentials
                );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public async Task<UserPais> GetUserByEmail(string email)
        {
            return await _context.UserPais.Where(x => x.Email.ToLower() == email.ToLower()).FirstOrDefaultAsync();
        }

        public async Task<bool> UserExists(string email)
        {
            var usuario = await _context.UserPais.Where(x => x.Email.ToLower() == email.ToLower()).FirstOrDefaultAsync();
            if (usuario == null) return false;
            return true;
        }
    }
}

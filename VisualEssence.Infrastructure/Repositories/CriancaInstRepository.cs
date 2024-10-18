using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VisualEssence.Domain.Interfaces.NormalRepositories;
using VisualEssence.Domain.Models;
using VisualEssence.Domain.DTOs;
using System.Data;
using Microsoft.Extensions.FileProviders;
using VisualEssence.Infrastructure.Data;

namespace VisualEssence.Infrastructure.Repositories
{
    public class CriancaInstRepository : ICriancaInstRepository
    {
        private readonly ApplicationDbContext _context;

        public CriancaInstRepository(ApplicationDbContext context)
        {
            _context = context;
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

        public async Task<bool> AtualizarFoto(Guid id, string foto)
        {
            var crianca = await _context.CriancaInst.FirstOrDefaultAsync(c => c.Id == id);
            if (crianca == null)
            {
                throw new KeyNotFoundException("Criança não encontrada.");
            }

            crianca.Foto = foto;
            _context.CriancaInst.Update(crianca);
            await _context.SaveChangesAsync();

            return true;
        }

        public Task<CriancaInst> GetByIdAsyncUser(Guid id)
        {
            throw new NotImplementedException();
        }
    }

}

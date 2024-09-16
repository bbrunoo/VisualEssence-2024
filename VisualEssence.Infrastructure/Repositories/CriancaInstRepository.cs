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
using VisualEssence.Infrastructure.Context;
using VisualEssence.Domain.DTOs;
using System.Data;
using Microsoft.Extensions.FileProviders;

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

        //byte[] fotoBytes = null;

        //if (criancaDto.Foto != null && criancaDto.Foto.Length > 0)
        //{
        //    using (var memoryStream = new MemoryStream())
        //    {
        //        await criancaDto.Foto.CopyToAsync(memoryStream);
        //        fotoBytes = memoryStream.ToArray();
        //    }
        //}
        public async Task<CriancaInst> PostCrianca(CriancaInst crianca)
        {
            bool isUsuarioInstitucional = await _context.UserInst.AnyAsync(u => u.Id == crianca.UserInstId);
            if (!isUsuarioInstitucional)
            {
                throw new Exception("Usuário não encontrado.");
            }

            // Adicionar a nova criança
            _context.CriancaInst.Add(crianca);
            await _context.SaveChangesAsync();

            return crianca;
        }




        public async Task<CriancaInstDTO> Update(Guid id, CriancaInstDTO criancaDto)
        {
            Console.WriteLine($"Atualizando criança com ID: {id}");
            Console.WriteLine($"ID da Sala no DTO: {criancaDto.IdSala}");


            var crianca = await _context.CriancaInst
               .Include(c => c.Sala)
               .FirstOrDefaultAsync(c => c.Id == id);

            if (crianca == null)
            {
                throw new KeyNotFoundException("Criança não encontrada.");
            }

            var novaSala = await _context.Sala.FindAsync(criancaDto.IdSala);
            if (novaSala == null)
            {
                throw new KeyNotFoundException("Sala não encontrada.");
            }

            if (crianca.IdSala != criancaDto.IdSala)
            {
                var numCriancasNaNovaSala = await _context.CriancaInst.CountAsync(c => c.IdSala == criancaDto.IdSala);
                if (numCriancasNaNovaSala >= novaSala.Capacidade)
                {
                    throw new Exception("Capacidade máxima da nova sala atingida. Não é possível mover a criança para esta sala.");
                }

                if (crianca.Sala != null)
                {
                    crianca.Sala.CriancaInst.Remove(crianca);
                }

                crianca.IdSala = criancaDto.IdSala;
                crianca.Sala = novaSala;
            }


            crianca.Nome = criancaDto.Nome;
            crianca.Sexo = criancaDto.Sexo;
            crianca.NomeResp = criancaDto.NomeResp;
            crianca.Cpf = criancaDto.Cpf;
            crianca.Cns = criancaDto.Cns;
            crianca.DataNascimento = criancaDto.DataNascimento;
            crianca.Endereco = criancaDto.Endereco;
            crianca.Rg = criancaDto.Rg;
            crianca.Tel1 = criancaDto.Tel1;
            crianca.Tel2 = criancaDto.Tel2;

            //if (criancaDto.Foto != null && criancaDto.Foto.Length > 0)
            //{
            //    using (var memoryStream = new MemoryStream())
            //    {
            //        await criancaDto.Foto.CopyToAsync(memoryStream);
            //        criancaExistente.Foto = memoryStream.ToArray();
            //    }
            //}

            _context.CriancaInst.Update(crianca);
            await _context.SaveChangesAsync();
            return criancaDto;
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

        public async Task<IEnumerable<RequestCriancaInstDTO>> GetCriancasByQuery(Guid? idsala, string? codigo, string? nome)
        {
            Console.WriteLine($"Nome recebido: {nome}");

            var query = _context.CriancaInst.Include(c => c.Sala).AsQueryable();

            if (idsala.HasValue)
            {
                query = query.Where(c => c.IdSala == idsala.Value);
            }

            if (!string.IsNullOrEmpty(codigo))
            {
                query = query.Where(a => a.Cns.ToLower().Contains(codigo));
            }

            if (!string.IsNullOrEmpty(nome))
            {
                var nomeTrimmed = nome.Trim().ToLower();
                query = query.Where(x => x.Nome != null && x.Nome.ToLower().Contains(nomeTrimmed));
            }

            var criancasDTO = await query.Select(c => new RequestCriancaInstDTO
            {
                Id = c.Id,
                Nome = c.Nome,
                Sexo = c.Sexo,
                NomeResp = c.NomeResp,
                Cpf = c.Cpf,
                Cns = c.Cns,
                DataNascimento = c.DataNascimento,
                Endereco = c.Endereco,
                Rg = c.Rg,
                Tel1 = c.Tel1,
                Tel2 = c.Tel2,
                IdSala = c.IdSala,
                Sala = c.Sala,

            }).ToListAsync();
            return criancasDTO;
        }

        
        public Task<CriancaInstDTO> Post(CriancaInstDTO dto)
        {
            throw new NotImplementedException();
        }

        //public Task<CriancaInstDTO> Post(CriancaInstDTO dto)
        //{
        //    throw new NotImplementedException();
        //}
    }
}

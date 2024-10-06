using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VisualEssence.Domain.DTOs;
using VisualEssence.Domain.Interfaces.NormalRepositories;
using VisualEssence.Domain.Models;
using VisualEssence.Infrastructure.Data;

namespace VisualEssence.Infrastructure.Repositories
{
    public class CriancaPaisRepository : ICriancaPaisRepository
    {
        private readonly ApplicationDbContext _context;
        public CriancaPaisRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<CriancaPais>> GetAllAsync()
        {
            return await _context.CriancaPais.ToListAsync();
        }
        public async Task<CriancaPais> GetByIdAsync(Guid id)
        {
            return await _context.CriancaPais.FindAsync(id);
        }
        public async Task<CriancaPaisDTO> Post(CriancaPaisDTO criancaDto)
        {
            if (criancaDto == null)
                throw new ArgumentNullException(nameof(criancaDto));

            var crianca = new CriancaPais
            {
                Nome = criancaDto.Nome,
                Idade = criancaDto.Idade,
            };

            _context.CriancaPais.Add(crianca);
            await _context.SaveChangesAsync();

            // Retorna o DTO com o ID gerado
            return new CriancaPaisDTO
            {
                Id = crianca.Id, // Inclui o ID gerado após a inserção
                Nome = crianca.Nome,
                Idade = crianca.Idade
            };
        }
        public async Task<CriancaPaisDTO> Update(Guid id, CriancaPaisDTO criancaDto)
        {
            var criancaExistente = await _context.CriancaPais.FindAsync(id);
            criancaExistente.Nome = criancaDto.Nome;
            criancaExistente.Idade = criancaDto.Idade;
            _context.CriancaPais.Update(criancaExistente);
            await _context.SaveChangesAsync();
            return criancaDto;
        }
        public async Task<CriancaPais> Delete(CriancaPais crianca)
        {
            _context.CriancaPais.Remove(crianca);
            await _context.SaveChangesAsync();
            return crianca;
        }
    }
}

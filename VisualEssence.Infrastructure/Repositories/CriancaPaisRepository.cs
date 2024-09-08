using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VisualEssence.Domain.DTOs;
using VisualEssence.Domain.Interfaces.NormalRepositories;
using VisualEssence.Domain.Models;
using VisualEssence.Infrastructure.Context;

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
            var crianca = new CriancaPais
            {
                Nome = criancaDto.Nome,
                Idade = criancaDto.Idade,
            };
            await _context.CriancaPais.AddAsync(crianca);
            await _context.SaveChangesAsync();
            return criancaDto;
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

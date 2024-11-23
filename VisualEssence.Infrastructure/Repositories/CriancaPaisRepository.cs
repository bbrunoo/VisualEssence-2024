using Microsoft.EntityFrameworkCore;
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

        public async Task<IEnumerable<CriancaPais>> GetAllByUserIdAsync(Guid userId)
        {
            return await _context.CriancaPais
                .Where(c => c.UserPaisId == userId)
                .ToListAsync();
        }
        public async Task<CriancaPais> GetByIdAsync(Guid id)
        {
            return await _context.CriancaPais.FindAsync(id);
        }
        public async Task<CriancaPaisDTO> Post(CriancaPaisDTO criancaDto)
        {
            throw new NotImplementedException();
        }

        public async Task<CriancaPais> PostCrianca(CriancaPais crianca)
        {
            bool isUsuarioInstitucional = await _context.UserPais.AnyAsync(u => u.Id == crianca.UserPaisId);
            if (!isUsuarioInstitucional)
            {
                throw new Exception("Usuário não encontrado.");
            }

            _context.CriancaPais.Add(crianca);
            await _context.SaveChangesAsync();

            return crianca;
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

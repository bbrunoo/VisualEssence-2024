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
    public class SalaRepository : ISalaRepository
    {

        private readonly ApplicationDbContext _context;
        public SalaRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Sala>> GetAllAsync()
        {
            return await _context.Sala.ToListAsync();
        }
        public async Task<Sala> GetByIdAsync(Guid id)
        {
            return await _context.Sala.FindAsync(id);
        }
        public async Task<SalaDTO> Post(SalaDTO salaDto)
        {
            var sala = new Sala
            {
                Capacidade = salaDto.Capacidade,
                Nome = salaDto.Nome,
            };

            await _context.Sala.AddAsync(sala);
            await _context.SaveChangesAsync();
           
            return salaDto;
        }
        public async Task<SalaDTO> Update(Guid id, SalaDTO sala)
        {
            var salaExistente = await _context.Sala.FindAsync(id);
            if (salaExistente == null) return null;

            salaExistente.Nome = sala.Nome;
            salaExistente.Capacidade = sala.Capacidade;

            _context.Sala.Update(salaExistente);
            await _context.SaveChangesAsync();

            return sala;
        }
        public async Task<Sala> Delete(Sala sala)
        {
            _context.Sala.Remove(sala);
            await _context.SaveChangesAsync();
            return sala;
        }
    }
}

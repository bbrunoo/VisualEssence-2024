using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VisualEssence.Domain.Models;

namespace VisualEssence.Domain.Interfaces.Games
{
    public interface IMiopiaGameRepository
    {
        Task<Jogada> Delete(Jogada entity);
        Task<IEnumerable<Jogada>> GetAllAsync();
        Task<Jogada> GetByIdAsync(int id);
        Task<Jogada> Post(Jogada newJogada);
        Task<Jogada> Update(Jogada entity);


    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VisualEssence.Domain.DTOs.GamesDTO.NewGame;
using VisualEssence.Domain.Models;

namespace VisualEssence.Domain.Interfaces.Games.SystemGamesRepository
{
    public interface ISystemGamesRepository
    {
        Task<IEnumerable<Jogo>> GetAllAsync();
        Task<Jogo> GetByIdAsync(int id);
        Task<Jogo> Post(JogoDTO newJogo);
        Task<Jogo> Delete(Jogo jogo);
    }
}

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VisualEssence.Domain.DTOs.GamesDTO.NewGame;
using VisualEssence.Domain.Interfaces.Games.SystemGamesRepository;
using VisualEssence.Domain.Models;
using VisualEssence.Infrastructure.Repositories.SystemGames;

namespace VisualEssence.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class JogoController : ControllerBase
    {
        private readonly ISystemGamesRepository _gamesRepository;

        public JogoController(ISystemGamesRepository gamesRepository)
        {
            _gamesRepository = gamesRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetJogos()
        {
            var jogo = await _gamesRepository.GetAllAsync();
            return Ok(jogo);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetJogoById(int id)
        {
            var jogos = await _gamesRepository.GetByIdAsync(id);
            if (jogos == null) return NotFound("Jogo nao encontrado");
            return Ok(jogos);
        }

        [HttpPost]
        public async Task<IActionResult> PostJogo(JogoDTO jogoDto)
        {
            var jogo = new Jogo()
            {
                Name = jogoDto.Name
            };
            await _gamesRepository.Post(jogoDto);
            return Ok(jogo);
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteJogo(Jogo jogo)
        {
            var jogoInData = await _gamesRepository.GetByIdAsync(jogo.Id);
            if (jogoInData == null) return NotFound("Jogo nao encontrado");
            await _gamesRepository.Delete(jogoInData);
            return Ok("Jogo deletado com sucesso");
        }

    }
}

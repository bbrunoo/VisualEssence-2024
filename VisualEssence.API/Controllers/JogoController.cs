using Microsoft.AspNetCore.Mvc;
using VisualEssence.Domain.DTOs.GamesDTO.NewGame;
using VisualEssence.Domain.Interfaces.Games.SystemGamesRepository;

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
            var jogos = await _gamesRepository.GetAllAsync();
            return Ok(jogos);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetJogoById(int id)
        {
            var jogo = await _gamesRepository.GetByIdAsync(id);
            if (jogo == null) return NotFound("Jogo não encontrado");
            return Ok(jogo);
        }

        [HttpPost]
        public async Task<IActionResult> PostJogo(JogoDTO jogoDto)
        {
            if (jogoDto == null || string.IsNullOrWhiteSpace(jogoDto.Nome))
            {
                return BadRequest("Dados do jogo inválidos.");
            }

            var jogo = await _gamesRepository.Post(jogoDto);
            return CreatedAtAction(nameof(GetJogoById), new { id = jogo.Id }, jogo);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteJogo(int id)
        {
            var jogo = await _gamesRepository.GetByIdAsync(id);
            if (jogo == null) return NotFound("Jogo não encontrado");

            await _gamesRepository.Delete(jogo);
            return Ok("Jogo deletado com sucesso");
        }
    }
}

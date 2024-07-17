using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using VisualEssence.Domain.DTOs.GamesDTO;
using VisualEssence.Domain.Interfaces.Games;
using VisualEssence.Domain.Models;

namespace VisualEssence.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [Authorize]
    public class JogadaController : ControllerBase
    {
        private readonly IMiopiaGameRepository _repository;
        public JogadaController(IMiopiaGameRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<IActionResult> GetJogadas()
        {
            var jogos = await _repository.GetAllAsync();
            return Ok(jogos);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetJogadasById(int id)
        {
            var jogos = await _repository.GetByIdAsync(id);
            return Ok(jogos);
        }

        [HttpPost("NewJogada")]
        public async Task<IActionResult> PostJogadas([FromBody] JogadaDTO jogadaDTO)
        {
            var userId = Guid.Parse(User.FindFirst("id").Value);
            if (userId == null) return Unauthorized();

            var newJogada = new Jogada
            {
                UserId = userId,
                Name = jogadaDTO.Name,
                IdJogo = jogadaDTO.IdJogo,
                Score = jogadaDTO.Score,
            };
            await _repository.Post(newJogada);
            return Ok();
        }
    }
}

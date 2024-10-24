using Microsoft.AspNetCore.Mvc;
using VisualEssence.Domain.DTOs.GamesDTO;
using VisualEssence.Domain.Interfaces.NormalRepositories;
using VisualEssence.Domain.Models.Jogada;

namespace VisualEssence.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class JogadaPaisController : ControllerBase
    {
        private readonly IJogadaPaisRepository _repository;
        public JogadaPaisController(IJogadaPaisRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<JogadaPais>>> GetAll()
        {
            var jogadas = await _repository.GetAllAsync();
            return Ok(jogadas);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<JogadaPais>> GetById(Guid id)
        {
            var jogada = await _repository.GetByIdAsync(id);
            if (jogada == null)
            {
                return NotFound();
            }
            return Ok(jogada);
        }

        [HttpPost]
        public async Task<ActionResult<JogadaPaisDTO>> Post(JogadaPaisDTO dto)
        {
            if (dto == null)
            {
                return BadRequest("Dados inválidos.");
            }

            var jogadaPais = await _repository.Post(dto);
            return CreatedAtAction(nameof(GetById), new { id = jogadaPais.NomeJogo }, jogadaPais);
        }


        [HttpPut("{id}")]
        public async Task<ActionResult<JogadaPaisDTO>> Put(Guid id, JogadaPaisDTO dto)
        {
            try
            {
                var updatedJogada = await _repository.Update(id, dto);
                return Ok(updatedJogada);
            }
            catch (KeyNotFoundException)
            {
                return NotFound("JogadaPais não encontrada.");
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(Guid id)
        {
            try
            {
                var jogadaPais = await _repository.GetByIdAsync(id);
                if (jogadaPais == null)
                {
                    return NotFound();
                }

                await _repository.Delete(jogadaPais);
                return NoContent();
            }
            catch (KeyNotFoundException)
            {
                return NotFound("JogadaPais não encontrada.");
            }
        }
        [HttpGet("historico/{nomeJogo}/{userId}")]
        public async Task<IActionResult> ObterHistoricoPorNomeJogo(string nomeJogo, Guid userId)
        {
            if (userId == Guid.Empty)
            {
                return BadRequest("O ID do usuário é obrigatório.");
            }

            var historicoJogadas = await _repository.ObterHistoricoPorNomeJogo(nomeJogo, userId);
            return Ok(historicoJogadas);
        }
    }
}

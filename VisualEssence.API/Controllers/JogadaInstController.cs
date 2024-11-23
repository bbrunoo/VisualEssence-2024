using Microsoft.AspNetCore.Mvc;
using VisualEssence.Domain.DTOs;
using VisualEssence.Domain.DTOs.GamesDTO;
using VisualEssence.Domain.Interfaces.NormalRepositories;
using VisualEssence.Domain.Models.Jogada;

namespace VisualEssence.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class JogadaInstController : ControllerBase
    {
        private readonly IJogadaInstRepository _repository;
        public JogadaInstController(IJogadaInstRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<JogadaInst>>> GetAll()
        {
            var jogadas = await _repository.GetAllAsync();
            return Ok(jogadas);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<JogadaInst>> GetById(Guid id)
        {
            var jogada = await _repository.GetByIdAsync(id);
            if (jogada == null)
            {
                return NotFound();
            }
            return Ok(jogada);
        }

        [HttpPost]
        public async Task<ActionResult<JogadaInstDTO>> Post(JogadaInstDTO dto)
        {
            if (dto == null)
            {
                return BadRequest("Dados inválidos.");
            }

            var jogadaInst = await _repository.Post(dto);
            return CreatedAtAction(nameof(GetById), new { id = jogadaInst.NomeJogo }, jogadaInst);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<JogadaInstDTO>> Put(Guid id, JogadaInstDTO dto)
        {
            try
            {
                var updatedJogada = await _repository.Update(id, dto);
                return Ok(updatedJogada);
            }
            catch (KeyNotFoundException)
            {
                return NotFound("JogadaInst não encontrada.");
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(Guid id)
        {
            try
            {
                var jogadaInst = await _repository.GetByIdAsync(id);
                if (jogadaInst == null)
                {
                    return NotFound();
                }

                await _repository.Delete(jogadaInst);
                return NoContent();
            }
            catch (KeyNotFoundException)
            {
                return NotFound("JogadaInst não encontrada.");
            }
        }

        [HttpGet("UltimosDoisJogosPorCrianca/{userId}")]
        public async Task<ActionResult<PaginatedResult<CriancaComJogosDTO>>> GetUltimosDoisJogosPorCrianca(
            Guid userId,
            int pageNumber = 1,
            int pageSize = 10,
            string? nomeJogo = null,
            string? nomeCrianca = null)
        {
            try
            {
                var paginatedResult = await _repository.ObterUltimosDoisJogosPorCrianca(userId, pageNumber, pageSize, nomeJogo, nomeCrianca);

                if (paginatedResult == null || !paginatedResult.Items.Any())
                {
                    return NotFound("Nenhum jogo encontrado para este usuário.");
                }

                return Ok(new
                {
                    Items = paginatedResult.Items,
                    TotalPages = paginatedResult.TotalPages
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro interno: {ex.Message}");
            }
        }

        [HttpGet("quantidade-por-categoria/{userId}")]
        public async Task<IActionResult> GetQuantidadePorCategoria(Guid userId)
        {
            try
            {
                var quantidadePorCategoria = await _repository.CalcularQuantidadePorCategoriaAsync(userId);

                return Ok(quantidadePorCategoria);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro ao calcular a quantidade por categoria: {ex.Message}");
            }
        }

        [HttpGet("jogadas-por-crianca/{criancaId}")]
        public async Task<ActionResult<IEnumerable<JogadaDetalhadaDTO>>> GetJogadasPorCrianca(Guid criancaId)
        {
            try
            {
                var jogadas = await _repository.ObterJogadasPorCrianca(criancaId);

                if (jogadas == null || !jogadas.Any())
                {
                    return NotFound("Nenhuma jogada encontrada para a criança informada.");
                }

                return Ok(jogadas);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro interno: {ex.Message}");
            }
        }

    }
}


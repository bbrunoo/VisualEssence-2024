using Microsoft.AspNetCore.Mvc;
using VisualEssence.Domain.DTOs;
using VisualEssence.Domain.DTOs.GamesDTO;
using VisualEssence.Domain.Interfaces.NormalRepositories;
using VisualEssence.Domain.Models.Jogada;
using VisualEssence.Infrastructure.Repositories.Jogadas;

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

        //[HttpGet("historico")]
        //public async Task<IActionResult> ObterHistoricoResumido(
        //[FromQuery] string? nomeJogo,
        //[FromQuery] string? nomeCrianca,
        //[FromQuery] Guid userId,
        //[FromQuery] int pageNumber = 1,
        //[FromQuery] int pageSize = 10)
        //{
        //    if (userId == Guid.Empty)
        //    {
        //        return BadRequest("O ID do usuário é obrigatório.");
        //    }

        //    if (pageNumber <= 0 || pageSize <= 0)
        //    {
        //        return BadRequest("Número da página e tamanho da página devem ser maiores que zero.");
        //    }

        //    var historicoResumido = await _repository.ObterHistoricoUnicoPorGuid(nomeJogo, nomeCrianca, userId, pageNumber, pageSize);
        //    return Ok(historicoResumido);
        //}

        //[HttpGet("historico/detalhado")]
        //public async Task<IActionResult> ObterHistoricoDetalhado(
        // [FromQuery] Guid userId,
        // [FromQuery] Guid criancaId,
        // [FromQuery] int pageNumber = 1,
        // [FromQuery] int pageSize = 10)
        //{
        //    if (userId == Guid.Empty)
        //    {
        //        return BadRequest("O ID do usuário é obrigatório.");
        //    }

        //    if (pageNumber <= 0 || pageSize <= 0)
        //    {
        //        return BadRequest("Número da página e tamanho da página devem ser maiores que zero.");
        //    }

        //    var historicoDetalhado = await _repository.ObterHistoricoCompletoPorGuid(userId, criancaId, pageNumber, pageSize);
        //    return Ok(historicoDetalhado);
        //}

        //[HttpGet("UltimoJogoPorCrianca/{userId}")]
        //public async Task<ActionResult<IEnumerable<HistoricoJogadasDTO>>> GetUltimoJogoPorCrianca(Guid userId)
        //{
        //    try
        //    {
        //        var historicoJogadas = await _repository.ObterUltimoJogoPorCrianca(userId);

        //        if (historicoJogadas == null || !historicoJogadas.Any())
        //        {
        //            return NotFound("Nenhum jogo encontrado para este usuário.");
        //        }

        //        return Ok(historicoJogadas);
        //    }
        //    catch (Exception ex)
        //    {
        //        // Log de erro, se necessário
        //        return StatusCode(500, $"Erro interno: {ex.Message}");
        //    }
        //}

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



    }
}


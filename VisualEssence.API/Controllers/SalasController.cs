using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using VisualEssence.Domain.DTOs;
using VisualEssence.Domain.Interfaces.NormalRepositories;
using VisualEssence.Domain.Models;

namespace VisualEssence.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class SalasController : ControllerBase
    {
        private readonly ISalaRepository _repository;
        public SalasController(ISalaRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<SalaDTO>>> GetSalas()
        {
            var salas = await _repository.GetAllAsync();
            var salaDto = salas.Select(s => new SalaDTO { Id = s.Id, Nome = s.Nome, Capacidade = s.Capacidade }).ToList();
            return Ok(salaDto);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var salas = await _repository.GetByIdAsync(id);
            return Ok(salas);
        }

        [HttpGet("User/{userId}")]
        public async Task<IActionResult> GetAllByUserId(Guid userId)
        {
            var salas = await _repository.GetAllByUserIdAsync(userId);

            if (salas == null || !salas.Any())
            {
                return NotFound("Nenhuma sala encontrada para este usuário.");
            }

            bool todasSalasPertencemAoUsuario = salas.All(c => c.UserInstId == userId);

            if (!todasSalasPertencemAoUsuario)
            {
                return Forbid("Usuário não autorizado a acessar esses dados.");
            }

            return Ok(salas);
        }

        [HttpPost]
        public async Task<IActionResult> CreateClass([FromBody] SalaDTO salaDto)
        {
 
            var newSala = new Sala
            { 
               Nome = salaDto.Nome,
               Capacidade = salaDto.Capacidade,
            };
            await _repository.Post(salaDto);
            return Ok(salaDto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateClass(Guid id, SalaDTO sala)
        {
            if (sala == null) return NotFound("sala nao encontrada");
            await _repository.Update(id, sala);
            return Ok(new { message = "editado com sucesso"});
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteClass(Guid id)
        {
            var sala = await _repository.GetByIdAsync(id);
            if (sala == null) return NotFound("sala nao encontrada");
            await _repository.Delete(sala);
            return Ok(new { message = "deletado com sucesso" });
        }

        [HttpGet("Criancas/{salaId}")]
        public async Task<IActionResult> GetChildrenBySalaId(Guid salaId)
        {
            var criancas = await _repository.GetChildrenBySalaIdAsync(salaId);

            if (criancas == null || !criancas.Any())
            {
                return NotFound("Nenhuma criança encontrada para esta sala.");
            }

            return Ok(criancas);
        }
    }
}

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VisualEssence.Domain.DTOs;
using VisualEssence.Domain.Interfaces.NormalRepositories;
using VisualEssence.Domain.Models;

namespace VisualEssence.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CriancaPaisController : ControllerBase
    {
        private readonly ICriancaPaisRepository _repository;
        public CriancaPaisController(ICriancaPaisRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var crianca = await _repository.GetAllAsync();
            return Ok(crianca);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var crianca = await _repository.GetByIdAsync(id);
            return Ok(crianca);
        }

        [HttpPost]
        public async Task<IActionResult> CreateCrianca([FromBody] CriancaPaisDTO criancaDto)
        {
            var crianca = new CriancaPais
            {
                Nome = criancaDto.Nome,
                Idade = criancaDto.Idade,
            };
            await _repository.Post(criancaDto);
            return Ok(crianca);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateClass(Guid id, CriancaPaisDTO crianca)
        {
            if (crianca == null) return NotFound("crianca nao encontrada");
            await _repository.Update(id, crianca);
            return Ok(new { message = "editado com sucesso" });
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteClass(Guid id)
        {
            var crianca = await _repository.GetByIdAsync(id);
            if (crianca == null) return NotFound("crianca nao encontrada");
            await _repository.Delete(crianca);
            return Ok(new { message = "deletado com sucesso" });
        }
    }
}

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using VisualEssence.Domain.DTOs;
using VisualEssence.Domain.Interfaces.NormalRepositories;
using VisualEssence.Domain.Models;
using VisualEssence.Infrastructure.Repositories;
//using VisualEssence.Domain.Services;

namespace VisualEssence.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CriancaInstController : ControllerBase
    {
        private readonly ICriancaInstRepository _repository;
        private readonly ISalaRepository _salaRepository;
        //private readonly IExcelService _excelService;

        public CriancaInstController(ICriancaInstRepository repository, ISalaRepository salaRepository /*, IExcelService excelService*/)
        {
            _repository = repository;
            _salaRepository = salaRepository;
            //_excelService = excelService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var criancas = await _repository.GetAllAsync();
            return Ok(criancas);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCrianca(Guid id)
        {
            var crianca = await _repository.GetByIdAsync(id);
            if (crianca == null)
            {
                return NotFound();
            }

            return Ok(crianca);
        }

        [HttpPost]
        public async Task<IActionResult> Create(CriancaInstDTO criancaDto)
        {
            try
            {
                var crianca = new CriancaInst
                {
                    Nome = criancaDto.Nome,
                    Sexo = criancaDto.Sexo,
                    NomeResp = criancaDto.NomeResp,
                    DataNascimento = criancaDto.DataNascimento,
                    Endereco = criancaDto.Endereco,
                    Cpf = criancaDto.Cpf,
                    Cns = criancaDto.Cns,
                    Rg = criancaDto.Rg,
                    Tel1 = criancaDto.Tel1,
                    Tel2 = criancaDto.Tel2,
                    IdSala = criancaDto.IdSala,
                    UserInstId = criancaDto.UserInstId
                    // Foto = criancaDto.Foto
                };

                await _repository.PostCrianca(crianca);
                return Ok();
            }
            catch (Exception ex)
            {
                // Logar o erro para diagnóstico
                return StatusCode(500, "Erro interno do servidor.");
            }
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, CriancaInstDTO crianca)
        {
            if (crianca == null) return NotFound("crianca nao encontrada");

            var criancaExiste = await _repository.GetByIdAsync(id);
            if (criancaExiste == null) return NotFound("Crianca nao encontrada");

            await _repository.Update(id, crianca);
            return Ok(new { message = "editado com sucesso" });
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(Guid id)
        {
            var crianca = await _repository.GetByIdAsync(id);
            if (crianca == null) return NotFound("crianca nao encontrada");
            await _repository.Delete(crianca);
            return Ok(new { message = "deletado com sucesso" });
        }

        //[HttpPost("upload")]
        //public async Task<IActionResult> AddInMass(IFormFile file)
        //{
        //    if (file == null || file.Length == 0) return NotFound("Arquivo nao enviado");

        //    try
        //    {
        //        using (var stream = new MemoryStream())
        //        {
        //            await file.CopyToAsync(stream);
        //            stream.Position = 0;

        //            var criancas = await _excelService.ProcessFileAsync(stream);

        //            foreach (var crianca in criancas)
        //            {
        //                await _repository.Post(crianca);
        //            }

        //            return Ok("Dados inseridos com sucesso");
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(StatusCodes.Status500InternalServerError, "Erro interno do servidor.");
        //    }
        //}

        [HttpGet("filter")]
        public async Task<ActionResult<IEnumerable<RequestCriancaInstDTO>>> FilterChildren([FromQuery] Guid? idSala, [FromQuery] string? codigo, [FromQuery] string? nomeCrianca)
        {
            var criancas = await _repository.GetCriancasByQuery(idSala, codigo, nomeCrianca);

            if (criancas == null) return Ok(Enumerable.Empty<RequestCriancaInstDTO>());

            return Ok(criancas);
        }
    }
}


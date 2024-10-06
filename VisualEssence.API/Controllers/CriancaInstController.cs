using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using VisualEssence.Domain.DTOs;
using VisualEssence.Domain.Interfaces.NormalRepositories;
using VisualEssence.Domain.Models;
using VisualEssence.Infrastructure.Repositories;
using static VisualEssence.Domain.Models.CriancaInst;
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
            if (criancaDto == null)
            {
                return BadRequest("Os dados da criança não podem ser nulos.");
            }

            if (string.IsNullOrWhiteSpace(criancaDto.Nome) ||
                string.IsNullOrWhiteSpace(criancaDto.Sexo) ||
                string.IsNullOrWhiteSpace(criancaDto.NomeResp) ||
                string.IsNullOrWhiteSpace(criancaDto.DataNascimento) ||
                string.IsNullOrWhiteSpace(criancaDto.Endereco) ||
                string.IsNullOrWhiteSpace(criancaDto.Cpf) ||
                string.IsNullOrWhiteSpace(criancaDto.Cns) ||
                string.IsNullOrWhiteSpace(criancaDto.Rg) ||
                string.IsNullOrWhiteSpace(criancaDto.Tel1) ||
                criancaDto.IdSala == Guid.Empty ||
                criancaDto.UserInstId == Guid.Empty)
            {
                return BadRequest("Todos os campos obrigatórios devem ser preenchidos.");
            }

            var novaSala = await _salaRepository.GetByIdAsync(criancaDto.IdSala);
            if (novaSala == null)
            {
                return BadRequest("Sala não existe.");
            }

            if (novaSala.CriancaInst == null)
            {
                novaSala.CriancaInst = new List<CriancaInst>();
            }

            if (novaSala.Capacidade <= novaSala.CriancaInst.Count)
            {
                throw new CapacidadeMaximaExcecao("Capacidade máxima da sala atingida.");
            }

            var novaCrianca = new CriancaInst
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
            };

            novaSala.CriancaInst.Add(novaCrianca);

            await _repository.PostCrianca(novaCrianca);

            var salaDto = new SalaDTO
            {
                Id = novaSala.Id,
                Nome = novaSala.Nome,
                Capacidade = novaSala.Capacidade,
            };

            await _salaRepository.Update(novaSala.Id, salaDto);

            return CreatedAtAction(nameof(GetCrianca), new { id = novaCrianca.Id }, novaCrianca);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, CriancaInstDTO criancaDto)
        {
            // Verificação se o DTO é nulo
            if (criancaDto == null)
            {
                return BadRequest("Os dados da criança não podem ser nulos.");
            }

            // Verificação de campos obrigatórios
            if (string.IsNullOrWhiteSpace(criancaDto.Nome) ||
                string.IsNullOrWhiteSpace(criancaDto.Sexo) ||
                string.IsNullOrWhiteSpace(criancaDto.NomeResp) ||
                string.IsNullOrWhiteSpace(criancaDto.DataNascimento) ||
                string.IsNullOrWhiteSpace(criancaDto.Endereco) ||
                string.IsNullOrWhiteSpace(criancaDto.Cpf) ||
                string.IsNullOrWhiteSpace(criancaDto.Cns) ||
                string.IsNullOrWhiteSpace(criancaDto.Rg) ||
                string.IsNullOrWhiteSpace(criancaDto.Tel1) ||
                criancaDto.IdSala == Guid.Empty ||
                criancaDto.UserInstId == Guid.Empty)
            {
                return BadRequest("Todos os campos obrigatórios devem ser preenchidos.");
            }

            // Busca a criança existente pelo ID
            var criancaExiste = await _repository.GetByIdAsync(id);
            if (criancaExiste == null)
            {
                return NotFound("Criança não encontrada.");
            }

            // Verifica se a nova sala existe
            var novaSala = await _salaRepository.GetByIdAsync(criancaDto.IdSala);
            if (novaSala == null)
            {
                return BadRequest("Nova sala não existe.");
            }

            // Verifica se a lista de crianças na nova sala foi inicializada
            if (novaSala.CriancaInst == null)
            {
                novaSala.CriancaInst = new List<CriancaInst>();
            }

            // Verifica se a nova sala tem capacidade
            if (novaSala.Capacidade <= novaSala.CriancaInst.Count)
            {
                return BadRequest("Capacidade máxima da nova sala atingida.");
            }

            // Remove a criança da sala anterior, se necessário
            if (criancaExiste.IdSala != criancaDto.IdSala)
            {
                // Lógica para remover a criança da sala anterior
                var salaAnterior = await _salaRepository.GetByIdAsync(criancaExiste.IdSala);
                if (salaAnterior != null && salaAnterior.CriancaInst != null)
                {
                    salaAnterior.CriancaInst.Remove(criancaExiste); // Remove a criança da sala anterior
                }
            }

            // Atualiza os dados da criança
            criancaExiste.Nome = criancaDto.Nome;
            criancaExiste.Sexo = criancaDto.Sexo;
            criancaExiste.NomeResp = criancaDto.NomeResp;
            criancaExiste.DataNascimento = criancaDto.DataNascimento;
            criancaExiste.Endereco = criancaDto.Endereco;
            criancaExiste.Cpf = criancaDto.Cpf;
            criancaExiste.Cns = criancaDto.Cns;
            criancaExiste.Rg = criancaDto.Rg;
            criancaExiste.Tel1 = criancaDto.Tel1;
            criancaExiste.Tel2 = criancaDto.Tel2;

            // Atualiza o ID da sala para a nova sala
            criancaExiste.IdSala = criancaDto.IdSala;

            // Adiciona a criança à nova sala
            novaSala.CriancaInst.Add(criancaExiste);

            await _repository.UpdateCrianca(id, criancaExiste);
            return Ok(new { message = "Editado com sucesso" });
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var crianca = await _repository.GetByIdAsync(id);
            if (crianca == null) return NotFound("Criança não encontrada");
            await _repository.Delete(crianca);
            return Ok(new { message = "Deletado com sucesso" });
        }

        [HttpGet("filter")]
        public async Task<ActionResult<IEnumerable<RequestCriancaInstDTO>>> FilterChildren([FromQuery] Guid? idSala, [FromQuery] string? codigo, [FromQuery] string? nomeCrianca)
        {
            var criancas = await _repository.GetCriancasByQuery(idSala, codigo, nomeCrianca);

            if (criancas == null) return Ok(Enumerable.Empty<RequestCriancaInstDTO>());

            return Ok(criancas);
        }

        [HttpPut("upload-foto/{id}")]
        public async Task<IActionResult> UploadFoto(Guid id, IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("Nenhuma imagem enviada.");

            try
            {
                var crianca = await _repository.GetByIdAsync(id);
                if (crianca == null)
                {
                    return NotFound("Criança não encontrada.");
                }

                // Lê o conteúdo do arquivo como um array de bytes
                using (var memoryStream = new MemoryStream())
                {
                    await file.CopyToAsync(memoryStream);
                    var fotoBytes = memoryStream.ToArray();

                    // Armazena a foto como string hexadecimal (se isso for necessário)
                    crianca.Foto = BitConverter.ToString(fotoBytes).Replace("-", string.Empty);
                    await _repository.UpdateCrianca(id, crianca);
                }

                return Ok("Upload realizado com sucesso!");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao fazer upload da foto: {ex.Message}");
                return StatusCode(500, "Erro interno ao processar o upload.");
            }
        }

        [HttpGet("foto/{id}")]
        public async Task<IActionResult> GetFoto(Guid id)
        {
            var crianca = await _repository.GetByIdAsync(id);
            if (crianca == null || crianca.Foto == null)
            {
                return NotFound("Foto não encontrada.");
            }

            // Converte a string hexadecimal de volta para um array de bytes
            byte[] fotoBytes = Enumerable.Range(0, crianca.Foto.Length)
                                         .Where(x => x % 2 == 0)
                                         .Select(x => Convert.ToByte(crianca.Foto.Substring(x, 2), 16))
                                         .ToArray();

            // Converte o array de bytes para uma string Base64
            var base64Foto = Convert.ToBase64String(fotoBytes);
            return Ok(new { foto = $"data:image/jpeg;base64,{base64Foto}" });
        }

    }
}


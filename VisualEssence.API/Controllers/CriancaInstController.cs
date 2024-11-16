using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using VisualEssence.Domain.DTOs;
using VisualEssence.Domain.Interfaces.NormalRepositories;
using VisualEssence.Domain.Models;
using static VisualEssence.Domain.Models.CriancaInst;

namespace VisualEssence.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CriancaInstController : ControllerBase
    {
        private readonly ICriancaInstRepository _repository;
        private readonly ISalaRepository _salaRepository;
        private readonly string _bucketName;

        public CriancaInstController(ICriancaInstRepository repository, ISalaRepository salaRepository, IConfiguration configuration)
        {
            _repository = repository;
            _salaRepository = salaRepository;
            _bucketName = configuration["AWS:BucketName"];
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

        [HttpGet("ByUser/{userId}")]
        public async Task<IActionResult> GetAllByUserId(Guid userId)
        {
            var criancas = await _repository.GetAllByUserIdAsync(userId);

            if (criancas == null || !criancas.Any())
            {
                return NotFound("Nenhuma criança encontrada para este usuário.");
            }

            bool todasCriancasPertencemAoUsuario = criancas.All(c => c.UserInstId == userId);

            if (!todasCriancasPertencemAoUsuario)
            {
                return Forbid("Usuário não autorizado a acessar esses dados.");
            }
            foreach (var c in criancas)
            {
                Console.WriteLine(c.JogadaInst.Count);
            }

            return Ok(criancas);
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
                UserInstId = novaSala.UserInstId
            };

            await _salaRepository.Update(novaSala.Id, salaDto);

            return CreatedAtAction(nameof(GetCrianca), new { id = novaCrianca.Id }, novaCrianca);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, CriancaInstDTO criancaDto)
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

            var criancaExiste = await _repository.GetByIdAsync(id);
            if (criancaExiste == null)
            {
                return NotFound("Criança não encontrada.");
            }

            var novaSala = await _salaRepository.GetByIdAsync(criancaDto.IdSala);
            if (novaSala == null)
            {
                return BadRequest("Nova sala não existe.");
            }

            if (novaSala.CriancaInst == null)
            {
                novaSala.CriancaInst = new List<CriancaInst>();
            }

            if (novaSala.Capacidade <= novaSala.CriancaInst.Count)
            {
                return BadRequest("Capacidade máxima da nova sala atingida.");
            }

            if (criancaExiste.IdSala != criancaDto.IdSala)
            {
                var salaAnterior = await _salaRepository.GetByIdAsync(criancaExiste.IdSala);
                if (salaAnterior != null && salaAnterior.CriancaInst != null)
                {
                    salaAnterior.CriancaInst.Remove(criancaExiste);
                }
            }

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
            criancaExiste.IdSala = criancaDto.IdSala;

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
        public async Task<ActionResult<IEnumerable<CriancaInst>>> FilterChildren([FromQuery] Guid? idSala, [FromQuery] string? codigo, [FromQuery] string? nomeCrianca)
        {
            var userClaim = User.FindFirst("id");
            if (userClaim == null)
            {
                return Unauthorized("Usuário não autenticado.");
            }

            if (!Guid.TryParse(userClaim.Value, out var userId))
            {
                return BadRequest("ID de usuário inválido.");
            }

            if (!idSala.HasValue && string.IsNullOrEmpty(codigo) && string.IsNullOrEmpty(nomeCrianca))
            {
                var criancas = await _repository.GetAllByUserIdAsync(userId);

                if (criancas == null || !criancas.Any())
                {
                    return NotFound("Nenhuma criança encontrada para este usuário.");
                }

                var criancasDTO = criancas.Select(c => new CriancaInst
                {
                    Id = c.Id,
                    Nome = c.Nome,
                    Sexo = c.Sexo,
                    NomeResp = c.NomeResp,
                    Cpf = c.Cpf,
                    Cns = c.Cns,
                    DataNascimento = c.DataNascimento,
                    Endereco = c.Endereco,
                    Rg = c.Rg,
                    Tel1 = c.Tel1,
                    Tel2 = c.Tel2,
                    IdSala = c.IdSala,
                    Sala = c.Sala,
                    UserInst = c.UserInst,
                    UserInstId = c.UserInstId,
                });

                return Ok(criancasDTO);
            }
            else
            {
                var criancasFiltradas = await _repository.GetCriancasByQuery(idSala, codigo, nomeCrianca, userId);

                if (criancasFiltradas == null || !criancasFiltradas.Any())
                {
                    return Ok(Enumerable.Empty<CriancaInst>());
                }

                var criancasDTO = criancasFiltradas.Select(c => new CriancaInst
                {
                    Id = c.Id,
                    Nome = c.Nome,
                    Sexo = c.Sexo,
                    NomeResp = c.NomeResp,
                    Cpf = c.Cpf,
                    Cns = c.Cns,
                    DataNascimento = c.DataNascimento,
                    Endereco = c.Endereco,
                    Rg = c.Rg,
                    Tel1 = c.Tel1,
                    Tel2 = c.Tel2,
                    IdSala = c.IdSala,
                    Sala = c.Sala,
                    UserInst = c.UserInst,
                    UserInstId = c.UserInstId,
                });

                return Ok(criancasDTO);
            }
        }

        [HttpPut("upload-foto/{criancaId}")]
        public async Task<IActionResult> UploadFotoAsync(Guid criancaId, IFormFile file)
        {
            await _repository.UploadFotoAsync(criancaId, file, _bucketName);
            return Ok("Foto adicionada com sucesso.");
        }

        [HttpGet("foto/{criancaId}")]
        public async Task<IActionResult> GetFotoUrlAsync(Guid criancaId)
        {
            try
            {
                var fotoUrl = await _repository.GetFotoUrlAsync(criancaId, _bucketName);
                return Ok(new { Url = fotoUrl });
            }
            catch (KeyNotFoundException e)
            {
                return NotFound(e.Message);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"Erro ao obter a foto: {e.Message}");
            }
        }

        [HttpGet("/plays/{id}")]
        public async Task<IActionResult> GetCriancaBySala(Guid id)
        {
            try
            {
                var criancaViewModel = await _repository.ObterCriancaComSalaAsync(id);
                return Ok(criancaViewModel);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }



        //[HttpGet("crianças-com-jogadas")]
        //public async Task<IActionResult> GetCriancasComJogadas([FromQuery] Guid userId)
        //{
        //    if (userId == Guid.Empty)
        //    {
        //        return BadRequest("O ID do usuário é obrigatório.");
        //    }

        //    var criancasComJogadas = await _repository.GetAllCriancasComJogadasByUserIdAsync(userId);

        //    return Ok(criancasComJogadas);
        //}

    }
}

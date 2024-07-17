using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using VisualEssence.Domain.Interfaces.NormalRepositories;
using VisualEssence.Domain.Models;

namespace VisualEssenceAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContatoController : ControllerBase
    {
        private readonly IContatoRepository _contatoRepository;
        public ContatoController(IContatoRepository contatoRepository)
        {
            _contatoRepository = contatoRepository;
        }

        [HttpPost("Contato")]
        public async Task<IActionResult> AddContato(Contato contato)
        {
            if (contato == null)
            {
                return BadRequest("Invalido");
            }

            await _contatoRepository.SendFeedback(contato);

            return Ok();
        }

        [HttpGet("ListaContatos")]
        public async Task<IActionResult> GetContato()
        {
            var result = await _contatoRepository.GetContatos();
            return Ok(result);
        }
    }
}

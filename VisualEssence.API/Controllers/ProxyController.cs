using Microsoft.AspNetCore.Mvc;
using System.Text;
using System.Text.Json;
using VisualEssence.Domain.Models;

namespace VisualEssence.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ProxyController : ControllerBase
    {
        private readonly HttpClient _httpClient;
        public ProxyController(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        [HttpPost("fazer-pergunta")]
        public async Task<IActionResult> FazerPergunta([FromBody] Chatbot chatbot)
        {
            string flaskApiUrl = "http://localhost:8080/pergunta";

            var jsonContent = JsonSerializer.Serialize(new { pergunta = chatbot.pergunta });
            var content = new StringContent(jsonContent, Encoding.UTF8, "application/json");

            var response = await _httpClient.PostAsync(flaskApiUrl, content);

            if (!response.IsSuccessStatusCode)
            {
                return StatusCode((int)response.StatusCode, "Erro ao consultar a API Flask");
            }

            var respostaString = await response.Content.ReadAsStringAsync();
            var respostaObj = JsonSerializer.Deserialize<JsonElement>(respostaString);
            string resposta = respostaObj.GetProperty("resposta").GetString();

            return Ok(new { resposta });
        }
    }
}

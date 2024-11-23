using Microsoft.AspNetCore.Mvc;
using QuestPDF.Fluent;
using QuestPDF.Infrastructure;
using VisualEssence.Domain.DTOs;
using VisualEssence.Domain.Interfaces.NormalRepositories;

namespace VisualEssence.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class PDFController : ControllerBase
    {
        private readonly IJogadaInstRepository _repository;

        public PDFController(IJogadaInstRepository repository)
        {
            _repository = repository;
        }

        [HttpGet("jogadas-por-crianca-pdf/{criancaId}")]
        public async Task<IActionResult> GetJogadasPorCriancaPdf(Guid criancaId)
        {
            try
            {
                var jogadas = await _repository.ObterJogadasPorCrianca(criancaId);

                if (jogadas == null || !jogadas.Any())
                {
                    return NotFound("Nenhuma jogada encontrada para a criança informada.");
                }

                var crianca = jogadas.First();

                var pdfBytes = GeneratePdf(crianca);

                var tempPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "temp_report.pdf");

                System.IO.File.WriteAllBytes(tempPath, pdfBytes);

                var fileResult = File(pdfBytes, "application/pdf", $"Relatorio_Crianca_{crianca.Nome}.pdf");

                System.IO.File.Delete(tempPath);

                return fileResult;
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro interno: {ex.Message}");
            }
        }

        private byte[] GeneratePdf(JogadaDetalhadaDTO crianca)
        {
            string logoPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "VisualEssenceLogo.png");

            if (!System.IO.File.Exists(logoPath))
            {
                throw new FileNotFoundException("Logo não encontrado no caminho especificado.");
            }

            byte[] logoImageBytes = System.IO.File.ReadAllBytes(logoPath);

            return QuestPDF.Fluent.Document.Create(document =>
            {
                document.Page(page =>
                {
                    page.Margin(50);
                    page.Content().Column(column =>
                    {
                        column.Item().Row(row =>
                        {
                            row.ConstantItem(80).Image(logoImageBytes, ImageScaling.FitArea);

                            row.RelativeItem().AlignCenter().Text($" {crianca.Nome} ")
                                .FontSize(20)
                                .Bold();
                        });

                        column.Item().Text(" ");

                        column.Item().Row(row =>
                        {
                            row.RelativeItem().Text($"Nome do Responsável: {crianca.NomeResponsavel}")
                                .FontSize(12);

                            row.RelativeItem().AlignRight().Text($"Sala: {crianca.SalaNome}")
                                .FontSize(12);
                        });

                        column.Item().Text($"Data de Nascimento: {crianca.DataNascimento:dd-MM-yyyy}")
                            .FontSize(12)
                            .Italic();

                        column.Item().Text(" ");

                        column.Item().Text("Historico:").FontSize(14).Bold();

                        foreach (var jogada in crianca.Jogadas)
                        {
                            column.Item().Text(" ");

                            var preDiagnostico = ObterPreDiagnostico(jogada.NomeJogo, jogada.Pontuacao);

                            column.Item().Row(row =>
                            {
                                row.RelativeItem().Text($"- Jogo: {jogada.NomeJogo} | Pontuação: {jogada.Pontuacao}")
                                    .FontSize(12);

                                row.RelativeItem().AlignRight().Text($"Data: {jogada.DataJogo:dd/MM/yyyy}")
                                    .FontSize(12);
                            });

                            column.Item().Text($"  Pré-Diagnóstico: {preDiagnostico}")
                                .FontSize(12)
                                .Italic();
                            column.Item().Text(" ");
                        }
                    });
                });
            }).GeneratePdf();
        }
        private string ObterPreDiagnostico(string nomeJogo, int pontuacao)
        {
            switch (nomeJogo)
            {
                case "Miopia":
                    if (pontuacao < 10) return "Se você percebeu dificuldade para ver objetos distantes com clareza, pode estar apresentando sinais de miopia. Este é um problema comum que pode ser corrigido com óculos ou lentes de contato, mas é importante procurar um médico para um diagnóstico adequado.";
                    if (pontuacao >= 11 && pontuacao < 18) return "Se você não teve problemas em enxergar a distância, sua visão está dentro do esperado. Mesmo assim, é importante realizar exames regulares para garantir que a saúde dos seus olhos seja mantida.";
                    if (pontuacao >= 18) return "Se sua visão de longe foi perfeita durante o teste, sua saúde ocular parece estar em excelente estado. Mas, como precaução, é recomendável consultar um oftalmologista para garantir que não haja nenhum problema subjacente.";
                    break;

                case "Miopia Letras":
                    if (pontuacao < 5) return "Se você percebeu dificuldade para ver objetos distantes com clareza, pode estar apresentando sinais de miopia. Este é um problema comum que pode ser corrigido com óculos ou lentes de contato, mas é importante procurar um médico para um diagnóstico adequado.";
                    if (pontuacao >= 6 && pontuacao < 8) return "Se você não teve problemas em enxergar a distância, sua visão está dentro do esperado. Mesmo assim, é importante realizar exames regulares para garantir que a saúde dos seus olhos seja mantida.";
                    if (pontuacao >= 9) return "Se sua visão de longe foi perfeita durante o teste, sua saúde ocular parece estar em excelente estado. Mas, como precaução, é recomendável consultar um oftalmologista para garantir que não haja nenhum problema subjacente.";
                    break;

                case "Daltonismo Animais":
                    if (pontuacao <= 12) return "Se você teve dificuldade em distinguir as cores dos animais, pode ser um sinal de daltonismo, uma condição que afeta a percepção das cores. Consultar um médico é essencial para confirmar se você possui daltonismo e entender como lidar com essa condição.";
                    if (pontuacao > 12 && pontuacao < 24) return "Se você conseguiu identificar corretamente as cores dos animais, sua percepção cromática parece estar saudável. Porém, é sempre bom realizar exames com um especialista para garantir que não há outros problemas com sua visão.";
                    if (pontuacao >= 25) return "Se você teve facilidade em identificar todas as cores, sua visão está em boa forma. Mesmo assim, um exame periódico é uma boa prática para monitorar a saúde dos seus olhos.";
                    break;

                case "Daltonismo Numeros":
                    if (pontuacao < 16) return "Se você teve dificuldade em enxergar ou identificar os números, isso pode indicar daltonismo. É importante buscar um oftalmologista para um diagnóstico correto e discutir as possíveis soluções.";
                    if (pontuacao >= 16 && pontuacao < 28) return "Se você conseguiu ver os números com clareza, sua percepção das cores provavelmente está dentro do normal. Uma consulta com um especialista é sempre recomendada para garantir a saúde dos seus olhos.";
                    if (pontuacao >= 29) return "Se você conseguiu identificar os números sem dificuldades, isso é um bom sinal de saúde ocular. Mesmo assim, é sempre importante realizar exames de rotina para manter seus olhos protegidos e detectar qualquer alteração precocemente.";
                    break;

                default:
                    return "Não há pré-diagnóstico disponível.";
            }

            return "Não há pré-diagnóstico disponível.";
        }
    }
}

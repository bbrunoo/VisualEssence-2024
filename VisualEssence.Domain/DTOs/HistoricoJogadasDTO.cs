using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VisualEssence.Domain.Models;

namespace VisualEssence.Domain.DTOs
{
    public class HistoricoJogadasDTO
    {
        public string NomeCrianca { get; set; }
        public string NomeJogo { get; set; }
        public string SalaNome { get; set; }
        public int Pontuacao { get; set; }
        public DateTime DataJogo { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VisualEssence.Domain.DTOs
{
    public class HistoricoJogadasDTO
    {
        public string NomeCrianca { get; set; }
        public string NomeJogo { get; set; }
        public int Pontuacao { get; set; }
        public DateTime DataJogo { get; set; }
    }
}

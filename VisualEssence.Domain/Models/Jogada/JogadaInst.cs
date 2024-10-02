using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VisualEssence.Domain.Models.Jogada
{
    public class JogadaInst
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string NomeJogo { get; set; }
        public Guid IdCrianca { get; set; }
        public CriancaInst CriancaInst { get; set; }
        public int Pontuacao { get; set; }
        public DateTime DataJogo { get; set; } = DateTime.Now;
    }
}

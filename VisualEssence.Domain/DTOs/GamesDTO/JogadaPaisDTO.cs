using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VisualEssence.Domain.Models;

namespace VisualEssence.Domain.DTOs.GamesDTO
{
    public class JogadaPaisDTO
    {
        public Guid Id { get; set; }
        public int IdJogo { get; set; }
        public Guid IdCrianca { get; set; }
        public int Pontuacao { get; set; }
        public DateTime DataJogo { get; set; }
    }
}

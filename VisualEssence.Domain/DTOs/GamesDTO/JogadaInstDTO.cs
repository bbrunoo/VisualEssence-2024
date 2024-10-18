using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VisualEssence.Domain.Models;

namespace VisualEssence.Domain.DTOs.GamesDTO
{
    public class JogadaInstDTO
    {
        public Guid Id { get; set; }
        public string NomeJogo { get; set; }
        public Guid IdCrianca { get; set; }
        public int Pontuacao { get; set; }
        public DateTime DataJogo { get; set; }
        public Guid UserInstId { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VisualEssence.Domain.DTOs
{
    public class ContatoDTO
    {
        public string Nome { get; set; }
        public string Email { get; set; }
        public string Assunto { get; set; }
        public string Descricao { get; set; }
        public DateTime DataEnvio { get; set; } = DateTime.Now;
    }
}

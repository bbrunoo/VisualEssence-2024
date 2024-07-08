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
        [Required]
        [MaxLength(255)]
        public string Nome { get; set; }

        [Required]
        [EmailAddress]
        [MaxLength(255)]
        public string Email { get; set; }

        [Required]
        [MaxLength(255)]
        public string Assunto { get; set; }

        [Required]
        [MaxLength(500)]
        public string Descricao { get; set; }
        public DateTime DataEnvio { get; set; } = DateTime.Now;
    }
}

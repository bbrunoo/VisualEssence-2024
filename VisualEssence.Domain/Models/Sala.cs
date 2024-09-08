using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VisualEssence.Domain.Models
{
    public class Sala
    {
        public Sala(string nome, int capacidade)
        {
            Id = Guid.NewGuid();
            Nome = nome;
            Capacidade = capacidade;
        }
        public Sala() { }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
        [Required]
        public string Nome { get; set; }
        [Required]
        public int Capacidade { get; set; }
    }
}

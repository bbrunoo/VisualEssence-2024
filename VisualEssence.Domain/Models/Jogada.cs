using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VisualEssence.Domain.Models
{
    public class Jogada
    {
        public Jogada()
        {

        }
        public Jogada(string name, int score, int idJogo, Guid userId)
        {
            Id = Guid.NewGuid();
            Name = name;
            Score = score;
            IdJogo = idJogo;
            UserId = userId;
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
        [MaxLength(100)]
        public string Name { get; set; }
        [MaxLength(10)]
        public int Score { get; set; }

        [ForeignKey("Jogo")]
        public int IdJogo { get; set; }
        public Jogo Jogo { get; set; }

        [NotNull]
        public Guid UserId { get; set; }

    }
}

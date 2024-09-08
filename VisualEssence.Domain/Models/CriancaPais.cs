using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VisualEssence.Domain.Models
{
    public class CriancaPais
    {
        public CriancaPais(string nome, int idade)
        {
            Id = Guid.NewGuid();
            Nome = nome;
            Idade = idade;
        }
        public CriancaPais  () { }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
        [Required]
        public string Nome { get; set; }
        [Required]
        public int Idade { get; set; }
    }

}

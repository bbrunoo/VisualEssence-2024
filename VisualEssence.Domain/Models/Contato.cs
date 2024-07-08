using System.ComponentModel.DataAnnotations;

namespace VisualEssence.Domain.Models
{
    public class Contato
    {
        public Contato(int id, string nome, string email, string assunto, string descricao, DateTime dataEnvio)
        {
            Id = id;
            Nome = nome;
            Email = email;
            Assunto = assunto;
            Descricao = descricao;
            DataEnvio = dataEnvio = DateTime.Now;
        }

        [Key]
        public int Id { get; set; }

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

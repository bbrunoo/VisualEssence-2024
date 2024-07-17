using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VisualEssence.Domain.Models
{
    public class UserPais
    {
        public UserPais()
        {
        }

        [Key]
        public Guid Id { get; set; }

        [Required]
        [MaxLength(255)]
        public string Nome { get; set; }

        [Required]
        [EmailAddress]
        [MaxLength(255)]
        public string Email { get; set; }

        [NotMapped]
        public string Senha { get; set; }
        [Required]
        public byte[] SenhaHash { get; set; }
        public byte[] SenhaSalt { get; set; }

        [Required]
        public bool IsAdmin { get; set; }

        public UserPais(string nome, string email, byte[] senhaHash, byte[] senhaSalt, bool isAdmin)
        {
            Id = Guid.NewGuid();
            Nome = nome;
            Email = email;
            SenhaHash = senhaHash;
            SenhaSalt = senhaSalt;
            IsAdmin = isAdmin;
        }

    }
}

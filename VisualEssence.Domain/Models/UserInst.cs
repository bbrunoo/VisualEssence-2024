using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VisualEssence.Domain.Models
{
    public class UserInst
    {
        public UserInst()
        {
        }
        [Key]
        public Guid Id { get; set; }
        [Required]
        [MaxLength(255)]
        public string NomeInst { get; set; }
        [Required]
        [EmailAddress]
        [MaxLength(255)]
        public string Email { get; set; }
        [Required]
        public string CNPJ { get; set; }
        [Required]
        public byte[] SenhaHash { get; set; }
        public byte[] SenhaSalt { get; set; }
        [Required]
        public bool IsAdmin { get; set; }
        [NotMapped]
        public string Senha { get; set; }
        public ICollection<CriancaInst> Criancas { get; set; }

        public UserInst(string nomeInst, string email, string cnpj, byte[] senhaHash, byte[] senhaSalt, bool isAdmin)
        {
            NomeInst = nomeInst;
            Email = email;
            CNPJ = cnpj;
            SenhaHash = senhaHash;
            SenhaSalt = senhaSalt;
            IsAdmin = isAdmin;
            Id = Guid.NewGuid();
        }

        public void AlterarSenha(byte[] passwordHash, byte[] passwordSalt)
        {
            SenhaHash = passwordHash;
            SenhaSalt = passwordSalt;
        }
    }
}

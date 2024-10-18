using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using VisualEssence.Domain.Models.Jogada;

namespace VisualEssence.Domain.Models
{
    public class UserInst
    {
        public UserInst()
        {
        }
        public Guid Id { get; set; }
        public string NomeInst { get; set; }
        public string Email { get; set; }
        public string CNPJ { get; set; }
        public byte[] SenhaHash { get; set; }
        public byte[] SenhaSalt { get; set; }
        public bool IsAdmin { get; set; }
        public string Senha { get; set; }
        public ICollection<CriancaInst> Criancas { get; set; }
        public ICollection<Sala> Salas { get; set; }
        public ICollection<JogadaInst> Jogadas { get; set; }

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

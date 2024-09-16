using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using VisualEssence.Domain.Models.Jogada;

namespace VisualEssence.Domain.Models
{
    public class CriancaInst
    {
        public CriancaInst() { }

        public CriancaInst(string endereco, string nome, string sexo, string nomeResp, string cpf, string rg, string tel1, string tel2, Sala sala, string cns, string dataNascimento, Guid userInstId /*byte[] foto*/)
        {
            Id = Guid.NewGuid();
            Nome = nome;
            Sexo = sexo;
            NomeResp = nomeResp;
            DataNascimento = dataNascimento;
            Cpf = cpf;
            Rg = rg;
            Tel1 = tel1;
            Tel2 = tel2;
            Sala = sala;
            Cns = cns;
            Endereco = endereco;
            UserInstId = userInstId;
            //Foto = foto;
        }

        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        [MaxLength(100)]
        public string Nome { get; set; }

        [Required]
        [MaxLength(10)]
        public string Sexo { get; set; }

        [Required]
        [MaxLength(100)]
        public string NomeResp { get; set; }

        [Required]
        [MaxLength(10)]
        public string DataNascimento { get; set; }

        [Required]
        [MaxLength(200)]
        public string Endereco { get; set; }

        [Required]
        [MaxLength(11)]
        public string Cpf { get; set; }

        [Required]
        [MaxLength(15)]
        public string Cns { get; set; }

        [Required]
        [MaxLength(12)]
        public string Rg { get; set; }

        [Required]
        [MaxLength(15)]
        public string Tel1 { get; set; }

        [Required]
        [MaxLength(15)]
        public string Tel2 { get; set; }

        [Required]
        public Guid IdSala { get; set; }

        [ForeignKey("IdSala")]
        public Sala Sala { get; set; }

        [Required]
        public Guid UserInstId { get; set; }

        [ForeignKey("UserInstId")]
        public UserInst UserInst { get; set; }

        // Relacionamento One-to-Many com JogadaInst
        public ICollection<JogadaInst> JogadaInst { get; set; } = new List<JogadaInst>();

        //[Required]
        //public byte[] Foto { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VisualEssence.Domain.Models
{
    public class CriancaInst
    {
        public CriancaInst() { }
        public CriancaInst(string endereco, string nome, string sexo, string nomeResp, string cpf, string rg, string tel1, string tel2, Sala sala, string cns, string dataNascimento /*byte[] foto*/)
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
            //Foto = foto;
        }
        

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
        [Required]
        public string Nome { get; set; }
        [Required]
        public string Sexo { get; set; }
        [Required]
        public string NomeResp { get; set; }
        [Required]
        public string DataNascimento { get; set; }
        [Required]
        public string Endereco { get; set; }
        [Required]
        public string Cpf { get; set; }
        [Required]
        public string Cns{ get; set; }
        [Required]
        public string Rg { get; set; }
        [Required]
        public string Tel1 { get; set; }
        [Required]
        public string Tel2 { get; set; }
        [Required]
        [ForeignKey("Sala")]
        public Guid IdSala { get; set; }
        public Sala Sala { get; set; }
        //[Required]
        //public byte[] Foto { get; set; }
    }

}

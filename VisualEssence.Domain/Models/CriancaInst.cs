using System.Text.Json.Serialization;
using VisualEssence.Domain.Models.Jogada;

namespace VisualEssence.Domain.Models
{
    public class CriancaInst
    {
        public CriancaInst() { }

        public CriancaInst(string endereco, string nome, string sexo, string nomeResp, string cpf, string rg, string tel1, string tel2, Guid idSala, string cns, string dataNascimento, Guid userInstId, string foto)
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
            IdSala = idSala;
            Cns = cns;
            Endereco = endereco;
            UserInstId = userInstId;
            Foto = foto;
        }

        public Guid Id { get; set; } = Guid.NewGuid();
        public string Nome { get; set; }
        public string Sexo { get; set; }
        public string NomeResp { get; set; }
        public string DataNascimento { get; set; }
        public string Endereco { get; set; }
        public string Cpf { get; set; }
        public string Cns { get; set; }
        public string Rg { get; set; }
        public string Tel1 { get; set; }
        public string Tel2 { get; set; }
        public Guid IdSala { get; set; }
        [JsonIgnore]
        public Sala Sala { get; set; }
        public Guid UserInstId { get; set; }
        public UserInst UserInst { get; set; }
        public ICollection<JogadaInst> JogadaInst { get; set; } = new List<JogadaInst>();
        public string? Foto { get; set; }

        public class CapacidadeMaximaExcecao : Exception
        {
            public CapacidadeMaximaExcecao(string message) : base(message) { }
        }
    }
}

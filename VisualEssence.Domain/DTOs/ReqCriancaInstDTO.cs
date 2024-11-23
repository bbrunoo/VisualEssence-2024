using System.Text.Json.Serialization;

namespace VisualEssence.Domain.DTOs
{
    public class ReqCriancaInstDTO
    {
        public Guid Id { get; set; }
        public string Nome { get; set; }
        public string Sexo { get; set; }
        public string NomeResp { get; set; }
        public string Cpf { get; set; }
        public string Cns { get; set; }
        public string DataNascimento { get; set; }
        public string Endereco { get; set; }
        public string Rg { get; set; }
        public string Tel1 { get; set; }
        public string Tel2 { get; set; }
        public Guid IdSala { get; set; }

        [JsonIgnore]
        public SalaDTO Sala { get; set; }
    }
}

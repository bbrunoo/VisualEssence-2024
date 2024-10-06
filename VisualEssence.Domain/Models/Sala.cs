using System.Text.Json.Serialization;

namespace VisualEssence.Domain.Models
{
    public class Sala
    {
        public Sala(string nome, int capacidade)
        {
            Id = Guid.NewGuid();
            Nome = nome;
            Capacidade = capacidade;
        }
        public Sala() { }
        public Guid Id { get; set; }
        public string Nome { get; set; }
        public int Capacidade { get; set; }
        [JsonIgnore]
        public ICollection<CriancaInst> CriancaInst { get; set; }
    }
}

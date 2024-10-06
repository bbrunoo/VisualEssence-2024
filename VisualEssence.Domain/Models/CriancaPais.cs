using VisualEssence.Domain.Models.Jogada;

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

        public CriancaPais() { }
        public Guid Id { get; set; }
        public string Nome { get; set; }
        public int Idade { get; set; }
        public ICollection<JogadaPais> JogadaPais { get; set; } = new List<JogadaPais>();
    }
}

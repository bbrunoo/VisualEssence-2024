namespace VisualEssence.Domain.Models.Jogada
{
    public class JogadaPais
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string NomeJogo { get; set; }
        public Guid IdCrianca { get; set; }
        public CriancaPais CriancaPais { get; set; }
        public int Pontuacao { get; set; }
        public DateTime DataJogo { get; set; } = DateTime.UtcNow;
        public Guid UserPaisId { get; set; }
        public UserPais UserPais { get; set; }

    }

}

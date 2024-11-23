namespace VisualEssence.Domain.DTOs.GamesDTO
{
    public class JogadaPaisDTO
    {
        public Guid Id { get; set; }
        public string NomeJogo { get; set; }
        public Guid IdCrianca { get; set; }
        public int Pontuacao { get; set; }
        public DateTime DataJogo { get; set; }
        public Guid UserPaisId { get; set; }
    }
}

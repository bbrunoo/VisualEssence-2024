namespace VisualEssence.Domain.DTOs.GamesDTO
{
    public class JogadaInstDTO
    {
        public Guid Id { get; set; }
        public string NomeJogo { get; set; }
        public Guid IdCrianca { get; set; }
        public int Pontuacao { get; set; }
        public DateTime DataJogo { get; set; }
        public Guid UserInstId { get; set; }
    }
}

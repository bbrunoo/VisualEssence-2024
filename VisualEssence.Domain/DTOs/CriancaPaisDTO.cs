namespace VisualEssence.Domain.DTOs
{
    public class CriancaPaisDTO
    {
        public Guid Id { get; set; }
        public string Nome { get; set; }
        public int Idade { get; set; }
        public Guid UserPaisId { get; set; }
    }
}

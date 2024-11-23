namespace VisualEssence.Domain.DTOs
{
    public class SalaDTO
    {
        public Guid Id { get; set; }
        public string Nome { get; set; }
        public int Capacidade { get; set; }
        public Guid UserInstId { get; set; }
    }
}

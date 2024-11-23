namespace VisualEssence.Domain.DTOs
{
    public class ContatoDTO
    {
        public string Nome { get; set; }
        public string Email { get; set; }
        public string Assunto { get; set; }
        public string Descricao { get; set; }
        public DateTime DataEnvio { get; set; } = DateTime.Now;
    }
}

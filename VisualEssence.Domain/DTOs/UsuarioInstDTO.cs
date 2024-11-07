namespace VisualEssence.Domain.DTOs
{
    public class UsuarioInstDTO
    {
        public Guid Id { get; set; }
        public string NomeInst { get; set; }
        public string Email { get; set; }
        public string CNPJ { get; set; }
        public string? Foto { get; set; }
    }
}

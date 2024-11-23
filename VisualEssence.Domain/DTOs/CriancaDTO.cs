namespace VisualEssence.Domain.DTOs
{
    public class CriancaDTO
    {
        public Guid IdCrianca { get; set; }
        public string Foto { get; set; }
        public string Nome { get; set; }
        public List<object> Jogadas { get; set; } = new List<object>();
        public SalaViewModel Sala { get; set; }
    }

    public class SalaViewModel
    {
        public string NomeSala { get; set; }
    }
}

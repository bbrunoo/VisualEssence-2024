namespace VisualEssence.Domain.DTOs
{
    public class CriancaComJogosDTO
    {
        public Guid IdCrianca { get; set; }
        public string NomeCrianca { get; set; }
        public string SalaNome { get; set; }
        public string Foto { get; set; } 
        public List<HistoricoJogadasDTO> Jogos { get; set; } 
    }
}

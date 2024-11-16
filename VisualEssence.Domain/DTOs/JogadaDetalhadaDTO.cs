namespace VisualEssence.Domain.DTOs
{
    public class JogadaDetalhadaDTO
    {
        public string Nome { get; set; }
        public string DataNascimento { get; set; }
        public string NomeResponsavel { get; set; }
        public string SalaNome { get; set; }
        public string Foto { get; set; } 
        public List<JogadaGetDTO> Jogadas { get; set; }
    }

    public class JogadaGetDTO
    {
        public string NomeJogo { get; set; }
        public int Pontuacao { get; set; }
        public DateTime DataJogo { get; set; }
    }
}

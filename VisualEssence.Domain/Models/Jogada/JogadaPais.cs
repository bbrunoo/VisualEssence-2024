﻿namespace VisualEssence.Domain.Models.Jogada
{
    public class JogadaPais
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public int IdJogo { get; set; }
        public Guid IdCrianca { get; set; }
        public CriancaPais CriancaPais { get; set; }
        public int Pontuacao { get; set; }
        public DateTime DataJogo { get; set; } = DateTime.UtcNow;
    }

}
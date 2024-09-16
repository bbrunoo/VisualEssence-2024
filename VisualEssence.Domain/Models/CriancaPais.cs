using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using VisualEssence.Domain.Models.Jogada;

namespace VisualEssence.Domain.Models
{
    public class CriancaPais
    {
        public CriancaPais(string nome, int idade)
        {
            Id = Guid.NewGuid();
            Nome = nome;
            Idade = idade;
        }

        public CriancaPais() { }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [Required]
        public string Nome { get; set; }

        [Required]
        public int Idade { get; set; }

        [JsonIgnore]
        public ICollection<JogadaPais> JogadaPais { get; set; } = new List<JogadaPais>();
    }
}

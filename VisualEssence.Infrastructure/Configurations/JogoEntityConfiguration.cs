using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using VisualEssence.Domain.Models;

namespace VisualEssence.Infrastructure.Configurations
{
    public class JogoEntityConfiguration : IEntityTypeConfiguration<Jogo>
    {
        public void Configure(EntityTypeBuilder<Jogo> builder)
        {
            // Define a chave primária
            builder.HasKey(j => j.Id);

            // Define que Nome é uma propriedade obrigatória com tamanho máximo
            builder.Property(j => j.Nome)
                   .IsRequired()
                   .HasMaxLength(100);
        }
    }
}

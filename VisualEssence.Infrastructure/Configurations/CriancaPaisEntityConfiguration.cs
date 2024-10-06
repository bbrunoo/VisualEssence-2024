using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using VisualEssence.Domain.Models;

namespace VisualEssence.Infrastructure.Configurations
{
    public class CriancaPaisEntityConfiguration : IEntityTypeConfiguration<CriancaPais>
    {
        public void Configure(EntityTypeBuilder<CriancaPais> builder)
        {
            // Tabela
            builder.ToTable("CriancaPais");

            // Propriedades
            builder.Property(e => e.Id)
                .ValueGeneratedOnAdd();

            builder.Property(e => e.Nome)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(e => e.Idade)
                .IsRequired();

            // Relacionamento com JogadaPais
            builder.HasMany(e => e.JogadaPais)
                .WithOne()
                .HasForeignKey(j => j.IdCrianca)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}

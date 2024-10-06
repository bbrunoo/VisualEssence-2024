using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using VisualEssence.Domain.Models;

namespace VisualEssence.Infrastructure.Configurations
{
    public class SalaEntityConfiguration : IEntityTypeConfiguration<Sala>
    {
        public void Configure(EntityTypeBuilder<Sala> builder)
        {
            // Tabela
            builder.ToTable("Sala");

            // Chave primária
            builder.HasKey(s => s.Id);

            // Propriedades
            builder.Property(s => s.Id)
                .ValueGeneratedOnAdd();

            builder.Property(s => s.Nome)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(s => s.Capacidade)
                .IsRequired();

            // Relacionamento com CriancaInst
            builder.HasMany(s => s.CriancaInst)
                .WithOne(c => c.Sala) // A propriedade de navegação na classe CriancaInst
                .HasForeignKey(c => c.IdSala) // Chave estrangeira na classe CriancaInst
                .OnDelete(DeleteBehavior.Cascade); // Comportamento de exclusão em cascata
        }
    }
}

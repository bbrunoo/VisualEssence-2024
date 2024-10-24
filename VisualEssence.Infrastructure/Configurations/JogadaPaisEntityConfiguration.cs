using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using VisualEssence.Domain.Models.Jogada;

namespace VisualEssence.Infrastructure.Configurations
{
    public class JogadaPaisEntityConfiguration : IEntityTypeConfiguration<JogadaPais>
    {
        public void Configure(EntityTypeBuilder<JogadaPais> builder)
        {
            builder.ToTable("JogadaPais");

            builder.HasKey(e => e.Id);

            builder.Property(e => e.NomeJogo)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(e => e.Pontuacao)
                .IsRequired();

            builder.Property(e => e.DataJogo)
                .IsRequired();

            builder.HasOne(e => e.CriancaPais)
                .WithMany(c => c.JogadaPais)
                .HasForeignKey(e => e.IdCrianca)
                .OnDelete(DeleteBehavior.Cascade);
            
            builder.HasOne(s => s.UserPais)
                .WithMany(u => u.Jogadas)
                .HasForeignKey(s => s.UserPaisId)
                .OnDelete(DeleteBehavior.NoAction);

        }
    }
}

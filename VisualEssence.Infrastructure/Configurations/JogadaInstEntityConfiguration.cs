using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using VisualEssence.Domain.Models.Jogada;

namespace VisualEssence.Infrastructure.Configurations
{
    public class JogadaInstEntityConfiguration : IEntityTypeConfiguration<JogadaInst>
    {
        public void Configure(EntityTypeBuilder<JogadaInst> builder)
        {
            builder.ToTable("JogadaInst");

            builder.HasKey(j => j.Id);

            builder.Property(j => j.Id)
                .ValueGeneratedOnAdd();

            builder.Property(j => j.NomeJogo)
                .IsRequired()
                .HasMaxLength(100); 

            builder.Property(j => j.Pontuacao)
                .IsRequired();

            builder.Property(j => j.DataJogo)
                .IsRequired();

            builder.HasOne(j => j.CriancaInst)
                .WithMany()
                .HasForeignKey(j => j.IdCrianca)
                .OnDelete(DeleteBehavior.Cascade); 
        }
    }
}

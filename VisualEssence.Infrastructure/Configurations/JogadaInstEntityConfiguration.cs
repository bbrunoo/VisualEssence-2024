using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using VisualEssence.Domain.Models.Jogada;

namespace VisualEssence.Infrastructure.Configurations
{
    public class JogadaInstEntityConfiguration : IEntityTypeConfiguration<JogadaInst>
    {
        public void Configure(EntityTypeBuilder<JogadaInst> builder)
        {
            // Tabela
            builder.ToTable("JogadaInst");

            // Chave primária
            builder.HasKey(j => j.Id);

            // Propriedades
            builder.Property(j => j.Id)
                .ValueGeneratedOnAdd();

            builder.Property(j => j.NomeJogo)
                .IsRequired()
                .HasMaxLength(100); // Defina o tamanho máximo apropriado

            builder.Property(j => j.Pontuacao)
                .IsRequired();

            builder.Property(j => j.DataJogo)
                .IsRequired();

            // Relacionamentos
            builder.HasOne(j => j.CriancaInst)
                .WithMany()
                .HasForeignKey(j => j.IdCrianca)
                .OnDelete(DeleteBehavior.Cascade); // Define a ação ao deletar uma criança
        }
    }
}

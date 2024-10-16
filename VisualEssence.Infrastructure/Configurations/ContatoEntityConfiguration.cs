using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using VisualEssence.Domain.Models;

namespace VisualEssence.Infrastructure.Configurations
{
    public class ContatoEntityConfiguration : IEntityTypeConfiguration<Contato>
    {
        public void Configure(EntityTypeBuilder<Contato> builder)
        {
            builder.ToTable("Contato");

            builder.HasKey(c => c.Id);

            builder.Property(c => c.Id)
                .ValueGeneratedOnAdd();

            builder.Property(c => c.Nome)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(c => c.Email)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(c => c.Assunto)
                .IsRequired()
                .HasMaxLength(200);

            builder.Property(c => c.Descricao)
                .IsRequired()
                .HasMaxLength(500);

            builder.Property(c => c.DataEnvio)
                .IsRequired();
        }
    }
}

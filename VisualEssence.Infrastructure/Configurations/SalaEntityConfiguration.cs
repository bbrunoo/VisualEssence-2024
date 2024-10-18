using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using VisualEssence.Domain.Models;

namespace VisualEssence.Infrastructure.Configurations
{
    public class SalaEntityConfiguration : IEntityTypeConfiguration<Sala>
    {
        public void Configure(EntityTypeBuilder<Sala> builder)
        {
            builder.ToTable("Sala");

            builder.HasKey(s => s.Id);

            builder.Property(s => s.Id)
                .ValueGeneratedOnAdd();

            builder.Property(s => s.Nome)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(s => s.Capacidade)
                .IsRequired();

            builder.HasMany(s => s.CriancaInst)
                .WithOne(c => c.Sala)
                .HasForeignKey(c => c.IdSala)
                .OnDelete(DeleteBehavior.NoAction);

            builder.HasOne(s => s.UserInst)
                 .WithMany(u => u.Salas)
                 .HasForeignKey(s => s.UserInstId)
                 .OnDelete(DeleteBehavior.NoAction);
        }
    }
}

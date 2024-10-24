using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using VisualEssence.Domain.Models;

namespace VisualEssence.Infrastructure.Configurations
{
    public class CriancaPaisEntityConfiguration : IEntityTypeConfiguration<CriancaPais>
    {
        public void Configure(EntityTypeBuilder<CriancaPais> builder)
        {
            
            builder.ToTable("CriancaPais");

            builder.Property(e => e.Id)
                .ValueGeneratedOnAdd();

            builder.Property(e => e.Nome)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(e => e.Idade)
                .IsRequired();

            builder.HasMany(e => e.JogadaPais)
                .WithOne()
                .HasForeignKey(j => j.IdCrianca)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(c => c.UserPais)
                   .WithMany()
                   .HasForeignKey(c => c.UserPaisId)
                   .OnDelete(DeleteBehavior.Cascade);
        }
    }
}

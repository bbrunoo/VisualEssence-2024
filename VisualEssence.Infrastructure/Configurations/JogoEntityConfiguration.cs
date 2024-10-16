using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using VisualEssence.Domain.Models;

namespace VisualEssence.Infrastructure.Configurations
{
    public class JogoEntityConfiguration : IEntityTypeConfiguration<Jogo>
    {
        public void Configure(EntityTypeBuilder<Jogo> builder)
        {
            
            builder.HasKey(j => j.Id);

            builder.Property(j => j.Nome)
                   .IsRequired()
                   .HasMaxLength(100);
        }
    }
}

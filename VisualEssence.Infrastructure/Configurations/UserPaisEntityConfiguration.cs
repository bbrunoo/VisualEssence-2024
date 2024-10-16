using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using VisualEssence.Domain.Models;

namespace VisualEssence.Infrastructure.Configurations
{
    public class UserPaisEntityConfiguration : IEntityTypeConfiguration<UserPais>
    {
        public void Configure(EntityTypeBuilder<UserPais> builder)
        {
            builder.ToTable("UserPais");

            builder.HasKey(e => e.Id);

            builder.Property(e => e.Nome)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(e => e.Email)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(e => e.Senha)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(e => e.IsAdmin)
                .IsRequired();

            builder.Property(e => e.SenhaHash)
                .IsRequired();

            builder.Property(e => e.SenhaSalt)
                .IsRequired();
        }
    }
}

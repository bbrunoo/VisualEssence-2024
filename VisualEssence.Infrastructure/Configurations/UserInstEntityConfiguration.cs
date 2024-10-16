using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using VisualEssence.Domain.Models;

namespace VisualEssence.Infrastructure.Configurations
{
    public class UserInstEntityConfiguration : IEntityTypeConfiguration<UserInst>
    {
        public void Configure(EntityTypeBuilder<UserInst> builder)
        {
            builder.ToTable("UserInst");

            builder.HasKey(u => u.Id);

            builder.Property(u => u.Id)
                .ValueGeneratedOnAdd();

            builder.Property(u => u.NomeInst)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(u => u.Email)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(u => u.CNPJ)
                .IsRequired()
                .HasMaxLength(14); 

            builder.Property(u => u.SenhaHash)
                .IsRequired();

            builder.Property(u => u.SenhaSalt)
                .IsRequired();

            builder.Property(u => u.IsAdmin)
                .IsRequired();

            builder.HasMany(u => u.Criancas)
                .WithOne(c => c.UserInst)
                .HasForeignKey(c => c.UserInstId) 
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}

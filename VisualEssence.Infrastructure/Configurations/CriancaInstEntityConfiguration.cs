using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using VisualEssence.Domain.Models;

namespace VisualEssence.Infrastructure.Configurations
{
    public class CriancaInstEntityConfiguration : IEntityTypeConfiguration<CriancaInst>
    {
        public void Configure(EntityTypeBuilder<CriancaInst> builder)
        {
            builder.ToTable("CriancaInst");

            builder.HasKey(c => c.Id);

            builder.Property(c => c.Nome).IsRequired().HasMaxLength(100);
            builder.Property(c => c.Sexo).IsRequired().HasMaxLength(10);
            builder.Property(c => c.NomeResp).IsRequired().HasMaxLength(100);
            builder.Property(c => c.DataNascimento).IsRequired();
            builder.Property(c => c.Endereco).IsRequired().HasMaxLength(200);
            builder.Property(c => c.Cpf).IsRequired().HasMaxLength(11);
            builder.Property(c => c.Cns).IsRequired().HasMaxLength(15);
            builder.Property(c => c.Rg).IsRequired().HasMaxLength(20);
            builder.Property(c => c.Tel1).IsRequired().HasMaxLength(15);
            builder.Property(c => c.Tel2).HasMaxLength(15);
            builder.Property(c => c.Foto).HasColumnType("TEXT"); 

            builder.HasOne(c => c.Sala)
                   .WithMany()
                   .HasForeignKey(c => c.IdSala)
                   .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(c => c.UserInst)
                   .WithMany()
                   .HasForeignKey(c => c.UserInstId)
                   .OnDelete(DeleteBehavior.Cascade);
        }
    }
}

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using VisualEssence.Domain.Models;

namespace VisualEssence.Infrastructure.Configurations
{
    public class UserInstEntityConfiguration : IEntityTypeConfiguration<UserInst>
    {
        public void Configure(EntityTypeBuilder<UserInst> builder)
        {
            // Tabela
            builder.ToTable("UserInst");

            // Chave primária
            builder.HasKey(u => u.Id);

            // Propriedades
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
                .HasMaxLength(14); // Assumindo que o CNPJ tem 14 dígitos

            builder.Property(u => u.SenhaHash)
                .IsRequired();

            builder.Property(u => u.SenhaSalt)
                .IsRequired();

            builder.Property(u => u.IsAdmin)
                .IsRequired();

            // Relacionamento com CriancaInst
            builder.HasMany(u => u.Criancas)
                .WithOne(c => c.UserInst) // A propriedade de navegação na classe CriancaInst
                .HasForeignKey(c => c.UserInstId) // Chave estrangeira na classe CriancaInst
                .OnDelete(DeleteBehavior.Cascade); // Comportamento de exclusão em cascata
        }
    }
}

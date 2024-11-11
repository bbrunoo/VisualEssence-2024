﻿using Microsoft.EntityFrameworkCore;
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

            builder.Property(e => e.IsAdmin)
                .IsRequired();

            builder.Property(e => e.SenhaHash)
                .IsRequired();

            builder.Property(e => e.SenhaSalt)
                .IsRequired();

            builder.Ignore(e => e.Senha);

             builder.HasMany(u => u.Criancas)
                .WithOne(c => c.UserPais)
                .HasForeignKey(c => c.UserPaisId)
                .OnDelete(DeleteBehavior.NoAction);

            builder.Property(c => c.Foto).HasMaxLength(200);
        }
    }
}

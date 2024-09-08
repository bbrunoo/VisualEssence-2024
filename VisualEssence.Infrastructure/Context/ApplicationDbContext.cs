using Microsoft.EntityFrameworkCore;
using VisualEssence.Domain.Models;

namespace VisualEssence.Infrastructure.Context
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<UserInst> UserInst { get; set; }
        public DbSet<UserPais> UserPais { get; set; }
        public DbSet<Contato> Contato { get; set; }
        public DbSet<Jogada> Jogada { get; set; }
        public DbSet<Jogo> Jogo { get; set; }
        public DbSet<CriancaPais> CriancaPais{ get; set; }
        public DbSet<CriancaInst> CriancaInst{ get; set; }
        public DbSet<Sala> Sala{ get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);
            modelBuilder.Entity<UserInst>().HasIndex(e => e.Email).IsUnique();
            modelBuilder.Entity<UserPais>().HasIndex(e => e.Email).IsUnique();
            modelBuilder.Entity<Contato>().HasIndex(e => e.Email).IsUnique();

            modelBuilder.Entity<Jogada>()
                .HasOne(e => e.Jogo)
                .WithMany()
                .HasForeignKey(e => e.IdJogo);

            modelBuilder.Entity<CriancaInst>()
               .HasOne(e => e.Sala)
               .WithMany()
               .HasForeignKey(e => e.IdSala)
               .OnDelete(DeleteBehavior.Restrict);
        }
    }
}

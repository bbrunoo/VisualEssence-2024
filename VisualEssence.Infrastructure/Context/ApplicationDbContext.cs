using Microsoft.EntityFrameworkCore;
using VisualEssence.Domain.Models;
using VisualEssence.Domain.Models.Jogada;

namespace VisualEssence.Infrastructure.Context
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<UserInst> UserInst { get; set; }
        public DbSet<UserPais> UserPais { get; set; }
        public DbSet<Contato> Contato { get; set; }
        public DbSet<JogadaInst> JogadaInst { get; set; }
        public DbSet<JogadaPais> JogadaPais { get; set; }
        public DbSet<Jogo> Jogo { get; set; }
        public DbSet<CriancaPais> CriancaPais { get; set; }
        public DbSet<CriancaInst> CriancaInst { get; set; }
        public DbSet<Sala> Sala { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);
            modelBuilder.Entity<UserInst>().HasIndex(e => e.Email).IsUnique();
            modelBuilder.Entity<UserPais>().HasIndex(e => e.Email).IsUnique();
            modelBuilder.Entity<Contato>().HasIndex(e => e.Email).IsUnique();

            modelBuilder.Entity<JogadaInst>()
    .HasOne(j => j.CriancaInst)
    .WithMany()
    .HasForeignKey(j => j.IdCrianca)
    .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<JogadaPais>()
     .HasOne(j => j.CriancaPais)
     .WithMany()
     .HasForeignKey(j => j.IdCrianca)
     .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<CriancaInst>()
               .HasOne(e => e.Sala)
               .WithMany()
               .HasForeignKey(e => e.IdSala)
               .OnDelete(DeleteBehavior.Restrict);
        }
    }
}

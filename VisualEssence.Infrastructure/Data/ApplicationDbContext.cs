using Microsoft.EntityFrameworkCore;
using VisualEssence.Domain.Models;
using VisualEssence.Domain.Models.Jogada;
using VisualEssence.Infrastructure.Configurations;

namespace VisualEssence.Infrastructure.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext() : base()
        {

        }
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public virtual DbSet<UserInst> UserInst { get; set; }
        public virtual DbSet<UserPais> UserPais { get; set; }
        public virtual DbSet<Contato> Contato { get; set; }
        public virtual DbSet<JogadaInst> JogadaInst { get; set; }
        public virtual DbSet<JogadaPais> JogadaPais { get; set; }
        public virtual DbSet<Jogo> Jogo { get; set; }
        public virtual DbSet<CriancaPais> CriancaPais { get; set; }
        public virtual DbSet<CriancaInst> CriancaInst { get; set; }
        public virtual DbSet<Sala> Sala { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new ContatoEntityConfiguration());
            modelBuilder.ApplyConfiguration(new CriancaInstEntityConfiguration());
            modelBuilder.ApplyConfiguration(new CriancaPaisEntityConfiguration());
            modelBuilder.ApplyConfiguration(new JogadaPaisEntityConfiguration());
            modelBuilder.ApplyConfiguration(new JogadaInstEntityConfiguration());
            modelBuilder.ApplyConfiguration(new JogoEntityConfiguration());
            modelBuilder.ApplyConfiguration(new SalaEntityConfiguration());
            modelBuilder.ApplyConfiguration(new UserInstEntityConfiguration());
            modelBuilder.ApplyConfiguration(new UserPaisEntityConfiguration());
            //modelBuilder.ApplyConfiguration(new CriancaImagemEntityConfiguration());


            base.OnModelCreating(modelBuilder);

        }

        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    base.OnModelCreating(modelBuilder); // Sempre bom chamar o base

        //    // Aplicar todas as configurações de entidade na assembly atual
        //    modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);
        //}
    }
}

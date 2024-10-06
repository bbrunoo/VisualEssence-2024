namespace VisualEssence.Domain.Models
{
    public class Contato
    {
        public Contato(int id, string nome, string email, string assunto, string descricao, DateTime dataEnvio)
        {
            Id = id;
            Nome = nome;
            Email = email;
            Assunto = assunto;
            Descricao = descricao;
            DataEnvio = dataEnvio = DateTime.Now;
        }
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }
        public string Assunto { get; set; }
        public string Descricao { get; set; }
        public DateTime DataEnvio { get; set; } = DateTime.Now;
    }
}

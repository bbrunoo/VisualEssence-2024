using System.ComponentModel.DataAnnotations;

namespace VisualEssence.Domain.DTOs
{
    public class UserInstDTO
    {
        public string NomeInst { get; set; }
        public string Email { get; set; }
        public string CNPJ { get; set; }
        public string Senha { get; set; }
    }
}

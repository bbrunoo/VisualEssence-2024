using System.ComponentModel.DataAnnotations;

namespace VisualEssence.Domain.DTOs
{
    public class EditUserInstDTO
    {
        public string NomeInst { get; set; }
        [EmailAddress]
        public string Email { get; set; }
        public string CNPJ { get; set; }
    }
}

using System.ComponentModel.DataAnnotations;

namespace VisualEssence.Domain.DTOs
{
    public class PLoginRequest
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        public string Senha { get; set; }
    }
}

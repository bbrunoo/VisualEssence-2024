using System.ComponentModel.DataAnnotations;

namespace VisualEssence.Domain.DTOs
{
    public class InstLoginRequest
    {
        [EmailAddress]
        public string EmailInst { get; set; }
        public string Senha { get; set; }
    }
}

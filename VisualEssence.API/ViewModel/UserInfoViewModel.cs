using System.ComponentModel.DataAnnotations;

namespace VisualEssence.API.ViewModel
{
    public class UserInfoViewModel
    {
        public Guid Id { get; set; }
        public string Nome { get; set; }
        [EmailAddress]
        public string Email { get; set; }
        public bool IsInstitucional { get; set; }
        public bool IsPais { get; set; }
    }
}

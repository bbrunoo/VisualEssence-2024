using System.ComponentModel.DataAnnotations;

namespace VisualEssence.API.ViewModel
{
    public class PaisRegisterViewModel
    {
        public string Nome { get; set; }
        [EmailAddress]
        public string Email { get; set; }
        public string Senha { get; set; }
    }
}

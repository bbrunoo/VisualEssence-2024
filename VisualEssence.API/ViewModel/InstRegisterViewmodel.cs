using System.ComponentModel.DataAnnotations;

namespace VisualEssence.API.ViewModel
{
    public class InstRegisterViewmodel
    {
        public string NomeInst { get; set; }
        [EmailAddress]
        public string Email { get; set; }
        public string CNPJ { get; set; }
        public string Senha { get; set; }
    }
}

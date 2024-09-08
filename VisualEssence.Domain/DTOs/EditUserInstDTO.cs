using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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

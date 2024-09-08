﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VisualEssence.Domain.DTOs
{
    public class EditUserPaisDTO
    {
        public string Nome { get; set; }
        [EmailAddress]
        public string Email { get; set; }
    }
}

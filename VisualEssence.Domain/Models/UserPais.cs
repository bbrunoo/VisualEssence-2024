﻿using System.ComponentModel.DataAnnotations.Schema;

namespace VisualEssence.Domain.Models
{
    public class UserPais
    {
        public UserPais()
        {
        }
        public Guid Id { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }
        public string Senha { get; set; }
        public byte[] SenhaHash { get; set; }
        public byte[] SenhaSalt { get; set; }
        public bool IsAdmin { get; set; }

        public UserPais(string nome, string email, byte[] senhaHash, byte[] senhaSalt, bool isAdmin)
        {
            Id = Guid.NewGuid();
            Nome = nome;
            Email = email;
            SenhaHash = senhaHash;
            SenhaSalt = senhaSalt;
            IsAdmin = isAdmin;
        }

    }
}

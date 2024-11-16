﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VisualEssence.Domain.DTOs;
using VisualEssence.Domain.Interfaces.GenericRepository;
using VisualEssence.Domain.Models;

namespace VisualEssence.Domain.Interfaces.NormalRepositories
{
    public interface ISalaRepository : IRepository<Sala, SalaDTO>
    {
        Task<IEnumerable<Sala>> GetAllByUserIdAsync(Guid userId);
        Task<IEnumerable<CriancaInst>> GetChildrenBySalaIdAsync(Guid salaId);
    }
}

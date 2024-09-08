using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VisualEssence.Domain.DTOs;

namespace VisualEssence.Domain.Services
{
    public interface IExcelService
    {
        Task<IEnumerable<CriancaInstDTO>> ProcessFileAsync(Stream fileStream);
    }
}

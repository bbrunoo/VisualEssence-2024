using OfficeOpenXml;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VisualEssence.Domain.DTOs;
using VisualEssence.Domain.Services;

namespace VisualEssence.Infrastructure.Service
{
//    public class ExcelService : IExcelService
//    {
//        public async Task<IEnumerable<CriancaInstDTO>> ProcessFileAsync(Stream fileStream)
//        {
//            var criancas = new List<CriancaInstDTO>();

//            using (var package = new ExcelPackage(fileStream))
//            {
//                var worksheet = package.Workbook.Worksheets[0];
//                var rowCount = worksheet.Dimension.Rows;

//                for (int row = 0; row < rowCount; row++)
//                {
//                    var newCrianca = new CriancaInstDTO
//                    {
//                        Nome = worksheet.Cells[row, 1].Text,
//                        NomeResp = worksheet.Cells[row, 1].Text,
//                        Cpf = worksheet.Cells[row, 1].Text,
//                        Rg = worksheet.Cells[row, 1].Text,
//                        Tel1 = worksheet.Cells[row, 1].Text,
//                        Tel2 = worksheet.Cells[row, 1].Text,
//                        Sexo = string.Parse(worksheet.Cells[row, 1].Text),
//                        //Foto = byte.Parse(worksheet.Cells[row, 1].Text),
//                    };
//                    criancas.Add(newCrianca);
//                }
//            }

//            return await Task.FromResult(criancas);
//        }
//    }
}

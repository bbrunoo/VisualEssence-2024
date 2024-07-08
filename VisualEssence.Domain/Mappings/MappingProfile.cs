using AutoMapper;
using VisualEssence.Domain.DTOs;
using VisualEssence.Domain.Models;

namespace VisualEssence.Infrasctructure.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile() { 
            CreateMap<UserPaisDTO, UserPais>();
            CreateMap<UserInstDTO, UserInst>();
        }
    }
}

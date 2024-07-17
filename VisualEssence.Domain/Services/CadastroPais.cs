using AutoMapper;
using VisualEssence.Domain.DTOs;
using VisualEssence.Domain.Interfaces.NormalRepositories;
using VisualEssence.Domain.Models;

namespace VisualEssenceAPI.Services
{
    public class CadastroPais
    {

        private readonly IUsuarioPaisRepository _usuarioPaisRepository;
        private readonly IMapper _mapper;

        public CadastroPais(IUsuarioPaisRepository usuarioPaisRepository, IMapper mapper)
        {
            _usuarioPaisRepository = usuarioPaisRepository;
            _mapper = mapper;
        }

        public async Task ExcetuteAsyncs(UserPaisDTO userPais)
        {
            var user = _mapper.Map<UserPais>(userPais);
            await _usuarioPaisRepository.AddUsuarioPais(user);
        }
    }

}

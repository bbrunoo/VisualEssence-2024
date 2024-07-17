using AutoMapper;
using VisualEssence.Domain.DTOs;
using VisualEssence.Domain.Interfaces.NormalRepositories;
using VisualEssence.Domain.Models;

namespace VisualEssenceAPI.Services
{
    public class CadastroInst
    {
        private readonly IUsuarioInstRepository _usuarioInstRepository;
        private readonly IMapper _mapper;

        public CadastroInst(IUsuarioInstRepository usuarioInstRepository, IMapper mapper)
        {
            _usuarioInstRepository = usuarioInstRepository;
            _mapper = mapper;
        }

        public async Task ExcetuteAsyncs(UserInstDTO userInst)
        {
            var user = _mapper.Map<UserInst>(userInst);
            await _usuarioInstRepository.AddUsuarioInst(user);
        }
    }
}

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using VisualEssence.API.ViewModel;
using VisualEssence.Domain.DTOs;
using VisualEssence.Domain.Interfaces.Authenticate;
using VisualEssence.Domain.Interfaces.NormalRepositories;
using VisualEssence.Domain.Models;
using VisualEssenceAPI.Services;

namespace VisualEssence.API
{
    [Route("[controller]")]
    [ApiController]


    public class AccountController : ControllerBase
    {
        private readonly IUsuarioInstRepository _usuarioInstRepository;
        private readonly CadastroInst _cadastroInst;
        private readonly IUsuarioPaisRepository _usuarioPaisRepository;
        private readonly CadastroPais _cadastroPais;
        private readonly IAuthenticatePais _authenticatePais;
        private readonly IAuthenticateInst _authenticateInst;

        public AccountController(IUsuarioInstRepository usuarioInstRepository, CadastroInst cadastroInst, IUsuarioPaisRepository usuarioPaisRepository, CadastroPais cadastroPais, IAuthenticatePais authenticatePais, IAuthenticateInst authenticateInst)
        {
            _usuarioInstRepository = usuarioInstRepository;
            _cadastroInst = cadastroInst;
            _usuarioPaisRepository = usuarioPaisRepository;
            _cadastroPais = cadastroPais;
            _authenticatePais = authenticatePais;
            _authenticateInst = authenticateInst;
        }

        [HttpGet("UsersInst")]
        public async Task<IActionResult> GetInst()
        {
            var users = await _usuarioInstRepository.GetUser();
            return Ok(users);
        }

        [HttpGet("UsersPais")]
        public async Task<IActionResult> GetPais()
        {
            var users = await _usuarioPaisRepository.GetUser();
            return Ok(users);
        }

        [HttpPost("cadastro-inst")]
        public async Task<ActionResult<UserInstToken>> RegisterInstituicao(InstRegisterViewmodel model)
        {
            if (model == null) return BadRequest("Dados Invalidos");

            var emailExistente = await _authenticateInst.UserExists(model.Email);

            if (emailExistente) return BadRequest("Email ja cadastrado");

            var userInst = new UserInst
            {
                Id = Guid.NewGuid(),
                NomeInst = model.NomeInst,
                Email = model.Email,
                CNPJ = model.CNPJ,
                Senha = model.Senha
            };

            var usuario = await _usuarioInstRepository.AddUsuarioInst(userInst);

            if (usuario == null) return BadRequest("Ocorreu um erro a cadastrar");

            var token = _authenticateInst.GenerateToken(usuario.Id, usuario.Email);

            return new UserInstToken
            {
                Token = token
            };
        }

        [HttpPost("login-inst")]
        public async Task<ActionResult<UserInstToken>> LoginInstituicao(InstLoginRequest loginRequest)
        {
            var existe = await _authenticateInst.UserExists(loginRequest.EmailInst);
            if (!existe) return BadRequest("Usuario nao existe.");

            var result = await _authenticateInst.AuthenticateAsync(loginRequest.EmailInst, loginRequest.Senha);
            if (!result) return Unauthorized("Usuario ou senha invalido.");

            var usuario = await _authenticateInst.GetUserByEmail(loginRequest.EmailInst);

            var token = _authenticateInst.GenerateToken(usuario.Id, usuario.Email);

            return new UserInstToken
            {
                Token = token
            };
        }

        [HttpPost("cadastro-pais")]
        public async Task<ActionResult<UserPaisToken>> RegisterPais(PaisRegisterViewModel model)
        {
            if (model == null) return BadRequest("Dados Invalidos");

            var emailExistente = await _authenticatePais.UserExists(model.Email);

            if (emailExistente) return BadRequest("Email ja cadastrado");

            var userPais = new UserPais
            {
                Id = Guid.NewGuid(),
                Nome = model.Nome,
                Email = model.Email,
                Senha = model.Senha
            };

            var usuario = await _usuarioPaisRepository.AddUsuarioPais(userPais);

            if (usuario == null) return BadRequest("Ocorreu um erro a cadastrar");

            var token = _authenticatePais.GenerateToken(usuario.Id, usuario.Email);

            return new UserPaisToken
            {
                Token = token
            };
        }

        [HttpPost("login-pais")]
        public async Task<ActionResult<UserPaisToken>> LoginPais(PLoginRequest loginRequest)
        {
            var existe = await _authenticatePais.UserExists(loginRequest.Email);
            if (!existe) return BadRequest("Usuario nao existe.");

            var result = await _authenticatePais.AuthenticateAsync(loginRequest.Email, loginRequest.Senha);
            if (!result) return Unauthorized("Usuario ou senha invalido.");

            var usuario = await _authenticatePais.GetUserByEmail(loginRequest.Email);

            var token = _authenticatePais.GenerateToken(usuario.Id, usuario.Email);

            return new UserPaisToken
            {
                Token = token
            };
        }

        [HttpGet("pais/{id}")]
        public async Task<ActionResult> GetPaisById(Guid id)
        {
            var usuario = await _usuarioPaisRepository.GetUsuarioById(id);

            if (usuario == null) return NotFound();
            return Ok(usuario);
        }

        [HttpGet("instituicao/{id}")]
        public async Task<ActionResult> GetInstById(Guid id)
        {
            var usuario = await _usuarioInstRepository.GetUsuarioById(id);

            if (usuario == null) return NotFound();
            return Ok(usuario);
        }

        [HttpDelete("Pais/{id}")]
        public async Task<IActionResult> DeletePais(Guid id)
        {
            var usuario = await _usuarioPaisRepository.GetUsuarioById(id);
            if (usuario == null) return NotFound("Nao existe");
            await _usuarioPaisRepository.Delete(usuario);
            return Ok();
        }

        [HttpDelete("Inst/{id}")]
        public async Task<IActionResult> DeleteInst(Guid id)
        {
            var usuario = await _usuarioInstRepository.GetUsuarioById(id);
            if (usuario == null) return NotFound("Nao existe");
            await _usuarioInstRepository.Delete(usuario);
            return Ok();
        }

        [HttpGet("user-infos")]
        public async Task<ActionResult<UserInfoViewModel>> GetProfileUser()
        {
            var userId = Guid.Parse(User.FindFirst("id").Value);
            if (userId == null) return NotFound();

            bool isUsuarioInstitucional = await _usuarioInstRepository.Exists(userId);
            bool isUsuarioPais = await _usuarioPaisRepository.Exists(userId);

            if (!isUsuarioInstitucional && !isUsuarioPais) return NotFound();

            if (isUsuarioInstitucional)
            {
                var user = await _usuarioInstRepository.GetUsuarioById(userId);
                var viewModel = new UserInfoViewModel
                {
                    Id = user.Id,
                    Nome = user.NomeInst,
                    Email = user.Email,
                    IsInstitucional = true,
                    IsPais = false
                };
                return Ok(viewModel);
            }
            else if (isUsuarioPais)
            {
                var user = await _usuarioPaisRepository.GetUsuarioById(userId);
                var viewModel = new UserInfoViewModel
                {
                    Id = user.Id,
                    Nome = user.Nome,
                    Email = user.Email,
                    IsInstitucional = false,
                    IsPais = true
                };
                return Ok(viewModel);
            }
            return NotFound();
        }
    }
}

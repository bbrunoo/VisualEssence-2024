using Microsoft.AspNetCore.Mvc;
using System.Text.RegularExpressions;
using VisualEssence.API.ViewModel;
using VisualEssence.Domain.DTOs;
using VisualEssence.Domain.Interfaces.Authenticate;
using VisualEssence.Domain.Interfaces.GenericRepository;
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
        private readonly string _bucketName;

        public AccountController(IUsuarioInstRepository usuarioInstRepository, CadastroInst cadastroInst, IUsuarioPaisRepository usuarioPaisRepository, CadastroPais cadastroPais, IAuthenticatePais authenticatePais, IAuthenticateInst authenticateInst, IConfiguration configuration)
        {
            _usuarioInstRepository = usuarioInstRepository;
            _cadastroInst = cadastroInst;
            _usuarioPaisRepository = usuarioPaisRepository;
            _cadastroPais = cadastroPais;
            _authenticatePais = authenticatePais;
            _authenticateInst = authenticateInst;
            _bucketName = configuration["AWS:BucketName"];
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
            if (users == null)
            {
                throw new Exception("Usuário não encontrado.");
            }
            return Ok(users);
        }

        [HttpPost("cadastro-inst")]
        public async Task<ActionResult<UserInstToken>> RegisterInstituicao(InstRegisterViewmodel model)
        {
            if (model == null)
                return BadRequest("Dados inválidos.");
            if (string.IsNullOrWhiteSpace(model.NomeInst) ||
                string.IsNullOrWhiteSpace(model.Email) ||
                string.IsNullOrWhiteSpace(model.Senha) ||
                string.IsNullOrWhiteSpace(model.CNPJ))
            {
                return BadRequest("Todos os campos são obrigatórios.");
            }

            if (model.Email.Contains(" "))
            {
                return BadRequest("O email não pode conter espaços em branco.");
            }

            if (model.Senha.Contains(" "))
            {
                return BadRequest("A senha não pode conter espaços em branco.");
            }

            if (!IsValidEmail(model.Email))
            {
                return BadRequest("O formato do email é inválido.");
            }

            if (model.Senha.Length < 8)
            {
                return BadRequest("A senha deve ter pelo menos 8 caracteres.");
            }

            if (model.CNPJ.Contains(" "))
            {
                return BadRequest("O CNPJ não pode conter espaços em branco.");
            }

            var emailExistente = await _authenticateInst.UserExists(model.Email);
            if (emailExistente)
                return BadRequest("Email já cadastrado.");

            var userInst = new UserInst
            {
                Id = Guid.NewGuid(),
                NomeInst = model.NomeInst,
                Email = model.Email,
                CNPJ = model.CNPJ,
                Senha = model.Senha
            };

            var usuario = await _usuarioInstRepository.AddUsuarioInst(userInst);

            if (usuario == null)
                return BadRequest("Ocorreu um erro ao cadastrar o usuário.");

            var token = _authenticateInst.GenerateToken(usuario.Id, usuario.Email);

            return Ok(new UserInstToken
            {
                Token = token
            });
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
            if (model == null)
                return BadRequest("Dados inválidos.");

            if (string.IsNullOrWhiteSpace(model.Nome) ||
                string.IsNullOrWhiteSpace(model.Email) ||
                string.IsNullOrWhiteSpace(model.Senha))
            {
                return BadRequest("Todos os campos são obrigatórios.");
            }

            if (model.Email.Contains(" "))
            {
                return BadRequest("O email não pode conter espaços em branco.");
            }

            if (model.Senha.Contains(" "))
            {
                return BadRequest("A senha não pode conter espaços em branco.");
            }

            if (!IsValidEmail(model.Email))
            {
                return BadRequest("O formato do email é inválido.");
            }

            if (model.Senha.Length < 8)
            {
                return BadRequest("A senha deve ter pelo menos 8 caracteres.");
            }

            var emailExistente = await _authenticatePais.UserExists(model.Email);
            if (emailExistente)
                return BadRequest("Email já cadastrado.");

            var userPais = new UserPais
            {
                Id = Guid.NewGuid(),
                Nome = model.Nome,
                Email = model.Email,
                Senha = model.Senha
            };

            var usuario = await _usuarioPaisRepository.AddUsuarioPais(userPais);

            if (usuario == null)
                return BadRequest("Ocorreu um erro ao cadastrar o usuário.");

            var token = _authenticatePais.GenerateToken(usuario.Id, usuario.Email);

            return Ok(new UserPaisToken
            {
                Token = token
            });
        }

        private bool IsValidEmail(string email)
        {
            var emailRegex = new Regex(@"^[^@\s]+@[^@\s]+\.[^@\s]+$");
            return emailRegex.IsMatch(email);
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
        public async Task<IActionResult> GetInstById(Guid id)
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
            var usuario = await _usuarioInstRepository.GetUsuarioByIdForDelete(id);
            if (usuario == null) return NotFound("Nao existe");
            await _usuarioInstRepository.Delete(usuario);
            return Ok();
        }

        [HttpGet("user-infos")]
        public async Task<ActionResult<UserInfoViewModel>> GetProfileUser()
        {
            var userClaim = User.FindFirst("id");
            if (userClaim == null)
            {
                return Unauthorized("Usuário não autenticado.");
            }

            if (!Guid.TryParse(userClaim.Value, out var userId))
            {
                return BadRequest("ID de usuário inválido.");
            }

            bool isUsuarioInstitucional = await _usuarioInstRepository.Exists(userId);
            bool isUsuarioPais = await _usuarioPaisRepository.Exists(userId);

            if (!isUsuarioInstitucional && !isUsuarioPais)
            {
                return NotFound("Usuário não encontrado.");
            }

            UserInfoViewModel viewModel;

            if (isUsuarioInstitucional)
            {
                var user = await _usuarioInstRepository.GetUsuarioById(userId);
                viewModel = new UserInfoViewModel
                {
                    Id = user.Id,
                    Nome = user.NomeInst,
                    Email = user.Email,
                    IsInstitucional = true,
                    IsPais = false
                };
            }
            else
            {
                var user = await _usuarioPaisRepository.GetUsuarioById(userId);
                viewModel = new UserInfoViewModel
                {
                    Id = user.Id,
                    Nome = user.Nome,
                    Email = user.Email,
                    IsInstitucional = false,
                    IsPais = true
                };
            }

            return Ok(viewModel);
        }



        [HttpPut("Pais/{id}")]
        public async Task<IActionResult> UpdatePais(Guid id, EditUserPaisDTO pais)
        {
            if (pais == null) return NotFound("crianca nao encontrada");
            await _usuarioPaisRepository.UpdateUserPais(id, pais);
            return Ok(new { message = "editado com sucesso" });
        }

        [HttpPut("Institucional/{id}")]
        public async Task<IActionResult> UpdateInst(Guid id, EditUserInstDTO inst)
        {
            if (inst == null) return NotFound("crianca nao encontrada");
            await _usuarioInstRepository.UpdateUserInst(id, inst);
            return Ok(new { message = "editado com sucesso" });
        }

        [HttpPut("inst/upload-foto/{userId}")]
        public async Task<IActionResult> UploadFotoAsync(Guid userId, IFormFile file)
        {
            await _usuarioInstRepository.UploadFotoAsync(userId, file, _bucketName);
            return Ok("Foto adicionada com sucesso.");
        }

        [HttpGet("inst/foto/{userId}")]
        public async Task<IActionResult> GetFotoUrlAsync(Guid userId)
        {
            try
            {
                var fotoUrl = await _usuarioInstRepository.GetFotoUrlAsync(userId, _bucketName);
                return Ok(new { Url = fotoUrl });
            }
            catch (KeyNotFoundException e)
            {
                return NotFound(e.Message);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"Erro ao obter a foto: {e.Message}");
            }
        }

        [HttpPut("pais/upload-foto/{userId}")]
        public async Task<IActionResult> UploadFotoAsyncPais(Guid userId, IFormFile file)
        {
            await _usuarioPaisRepository.UploadFotoAsync(userId, file, _bucketName);
            return Ok("Foto adicionada com sucesso.");
        }

        [HttpGet("pais/foto/{userId}")]
        public async Task<IActionResult> GetFotoUrlAsyncPais(Guid userId)
        {
            try
            {
                var fotoUrl = await _usuarioPaisRepository.GetFotoUrlAsync(userId, _bucketName);
                return Ok(new { Url = fotoUrl });
            }
            catch (KeyNotFoundException e)
            {
                return NotFound(e.Message);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"Erro ao obter a foto: {e.Message}");
            }
        }
    }
}

﻿using Microsoft.AspNetCore.Mvc;
using VisualEssence.Domain.DTOs.GamesDTO;
using VisualEssence.Domain.Interfaces.NormalRepositories;
using VisualEssence.Domain.Models.Jogada;

namespace VisualEssence.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class JogadaInstController : ControllerBase
    {
        private readonly IJogadaInstRepository _repository;
        public JogadaInstController(IJogadaInstRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<JogadaInst>>> GetAll()
        {
            var jogadas = await _repository.GetAllAsync();
            return Ok(jogadas);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<JogadaInst>> GetById(Guid id)
        {
            var jogada = await _repository.GetByIdAsync(id);
            if (jogada == null)
            {
                return NotFound();
            }
            return Ok(jogada);
        }

        [HttpPost]
        public async Task<ActionResult<JogadaInstDTO>> Post(JogadaInstDTO dto)
        {
            if (dto == null)
            {
                return BadRequest("Dados inválidos.");
            }

            var jogadaInst = await _repository.Post(dto);
            return CreatedAtAction(nameof(GetById), new { id = jogadaInst.NomeJogo }, jogadaInst);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<JogadaInstDTO>> Put(Guid id, JogadaInstDTO dto)
        {
            try
            {
                var updatedJogada = await _repository.Update(id, dto);
                return Ok(updatedJogada);
            }
            catch (KeyNotFoundException)
            {
                return NotFound("JogadaInst não encontrada.");
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(Guid id)
        {
            try
            {
                var jogadaInst = await _repository.GetByIdAsync(id);
                if (jogadaInst == null)
                {
                    return NotFound();
                }

                await _repository.Delete(jogadaInst);
                return NoContent();
            }
            catch (KeyNotFoundException)
            {
                return NotFound("JogadaInst não encontrada.");
            }
        }

        [HttpGet("historico/{nomeJogo}/{userId}")]
        public async Task<IActionResult> ObterHistoricoPorNomeJogo(string nomeJogo, Guid userId)
        {
            if (userId == Guid.Empty)
            {
                return BadRequest("O ID do usuário é obrigatório.");
            }

            var historicoJogadas = await _repository.ObterHistoricoPorNomeJogo(nomeJogo, userId);
            return Ok(historicoJogadas);
        }

    }
}


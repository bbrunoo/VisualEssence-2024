import { Component, OnInit } from '@angular/core';
import { MiopiaResult } from '../../../../Models/MiopiaGame/miopiaResult.model';
import { MiopiaGame } from '../../../../Models/MiopiaGame/miopiaGame.model';
import { MiopiaGameService } from '../Services/miopia-game.service';
import { RouterLink } from '@angular/router';
import { Jogada } from '../../../../Models/MiopiaGame/jogada.model';
import { CriancaPais } from '../../../../Models/MiopiaGame/criancapais.model';
import { LogoMenuComponent } from '../../../SharedMenu/logo-menu/logo-menu.component';
import { NgIf } from '@angular/common';
import { VlibrasComponent } from '../../../vlibras/vlibras.component';

@Component({
  selector: 'app-miopia-result',
  standalone: true,
  imports: [RouterLink, LogoMenuComponent, NgIf, VlibrasComponent],
  templateUrl: './miopia-result.component.html',
  styleUrl: './miopia-result.component.css'
})
export class MiopiaResultComponent implements OnInit {
  result: MiopiaResult;

  jogada: Jogada = {
    NomeJogo: "Miopia",
    idCrianca: '',
    pontuacao: 0
  };

  constructor(private gameService: MiopiaGameService) {
    this.result = history.state.data;
  }

  ngOnInit(): void {
    if (this.result) {
      this.jogada.pontuacao = this.result.score;
      this.processGameResult();
    }
  }

  processGameResult(): void {
    const nomeCrianca = localStorage.getItem("nomeCriancaPais");
    const idadeCrianca = localStorage.getItem("idadeCriancaPais");

    if (nomeCrianca && idadeCrianca) {
      const novaCrianca: CriancaPais = {
        nome: nomeCrianca,
        idade: Number(idadeCrianca)
      };

      this.gameService.cadastrarCrianca(novaCrianca).subscribe(
        criancaResponse => {
          console.log('Criança cadastrada com sucesso:', criancaResponse);
          this.jogada.idCrianca = criancaResponse.id ?? '';
          this.addNewJogada();
        },
        error => {
          console.error('Não foi possível registrar a criança', error);
        }
      );
    } else {
      console.error('Dados da criança não encontrados no localStorage.');
    }
  }

  addNewJogada(): void {
    if (this.jogada.idCrianca) {
      this.gameService.addJogada(this.jogada).subscribe(
        response => {
          console.log('Jogada adicionada com sucesso', response);
        },
        error => {
          console.error('Não foi possível adicionar a jogada', error);
        }
      );
    } else {
      console.error('ID da criança não encontrado.');
    }
  }
}

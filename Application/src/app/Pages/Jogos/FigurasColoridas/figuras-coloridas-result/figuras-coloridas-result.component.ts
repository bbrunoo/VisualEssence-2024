import { Component } from '@angular/core';
import { LogoMenuComponent } from '../../../SharedMenu/logo-menu/logo-menu.component';
import { NgIf } from '@angular/common';
import { MiopiaResult } from '../../../../Models/MiopiaGame/miopiaResult.model';
import { Jogada } from '../../../../Models/MiopiaGame/jogada.model';
import { MiopiaGameService } from '../../Miopia/Services/miopia-game.service';
import { CriancaPais } from '../../../../Models/MiopiaGame/criancapais.model';
import { MiopiaInstService } from '../../MiopiaInst/Services/miopia-inst.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-figuras-coloridas-result',
  standalone: true,
  imports: [LogoMenuComponent, NgIf, RouterLink],
  templateUrl: './figuras-coloridas-result.component.html',
  styleUrl: './figuras-coloridas-result.component.css'
})
export class FigurasColoridasResultComponent {
  result: { score: number } = { score: 0 };

  jogada: Jogada = {
    idJogo: 3,
    idCrianca: '',
    pontuacao: 0
  };

  constructor(private gameService: MiopiaGameService) {
    const storedResult = localStorage.getItem('Cores-Acertos-Pais');
    if (storedResult) {
      this.result = JSON.parse(storedResult);
    }  }

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

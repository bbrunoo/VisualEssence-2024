import { Component } from '@angular/core';
import { Jogada } from '../../../../Models/MiopiaGame/jogada.model';
import { MiopiaInstService } from '../../MiopiaInst/Services/miopia-inst.service';
import { LogoMenuComponent } from '../../../SharedMenu/logo-menu/logo-menu.component';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-figuras-coloridas-inst-result',
  standalone: true,
  imports: [LogoMenuComponent, NgIf, RouterLink],
  templateUrl: './figuras-coloridas-inst-result.component.html',
  styleUrls: ['./figuras-coloridas-inst-result.component.css'] // Corrigido de styleUrl para styleUrls
})
export class FigurasColoridasInstResultComponent {
  result: { score: number } = { score: 0 };

  jogada: Jogada = {
    idJogo: 3,
    idCrianca: '',
    pontuacao: 0
  };

  constructor(private gameService: MiopiaInstService) {
    // Ler resultado do localStorage
    const storedResult = localStorage.getItem('Cores-Acertos-Inst');
    if (storedResult) {
      this.result = JSON.parse(storedResult);
    }
  }

  ngOnInit(): void {
    if (this.result) {
      this.jogada.pontuacao = this.result.score;
      this.processGameResult();
    }
  }

  processGameResult(): void {
    const idCrianca = localStorage.getItem("idCriancaInst");

    if (idCrianca) {
      this.jogada.idCrianca = idCrianca;
      this.addNewJogada();
    } else {
      console.error('ID da criança não encontrado no localStorage.');
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

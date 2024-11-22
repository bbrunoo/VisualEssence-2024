import { Component } from '@angular/core';
import { LogoMenuInstComponent } from '../../../SharedMenu/logo-menu-inst/logo-menu-inst.component';
import { MiopiaResult } from '../../../../Models/MiopiaGame/miopiaResult.model';
import { Jogada } from '../../../../Models/MiopiaGame/jogada.model';
import { MiopiaInstService } from '../../MiopiaInst/Services/miopia-inst.service';
import { AuthService } from '../../../../../Services/Auth/AuthService/auth.service';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-dalto-animais-inst-result',
  standalone: true,
  imports: [LogoMenuInstComponent, RouterLink, NgIf],
  templateUrl: './dalto-animais-inst-result.component.html',
  styleUrl: './dalto-animais-inst-result.component.css'
})
export class DaltoAnimaisInstResultComponent {
  result: MiopiaResult;
  userInstId =  String(this.authService.getUserIdFromToken())

  jogada: Jogada = {
    NomeJogo: "Daltonismo Animais",
    idCrianca: '',
    pontuacao: 0,
    userInstId: this.userInstId
  };

  constructor(private gameService: MiopiaInstService, private authService: AuthService) {
    this.result = history.state.data;
  }

  ngOnInit(): void {
    if (this.result) {
      this.jogada.pontuacao = this.result.score;
      this.processGameResult();
    }
    console.log("userid para adicionar jogada:", this.userInstId)
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

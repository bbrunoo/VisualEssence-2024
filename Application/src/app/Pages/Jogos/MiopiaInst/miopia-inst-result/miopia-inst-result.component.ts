import { Component } from '@angular/core';
import { MiopiaResult } from '../../../../Models/MiopiaGame/miopiaResult.model';
import { Jogada } from '../../../../Models/MiopiaGame/jogada.model';
import { MiopiaGameService } from '../../Miopia/Services/miopia-game.service';
import { MiopiaInstService } from '../Services/miopia-inst.service';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { LogoMenuComponent } from "../../../SharedMenu/logo-menu/logo-menu.component";
import { AuthService } from '../../../../../Services/Auth/AuthService/auth.service';
import { LogoMenuInstComponent } from "../../../SharedMenu/logo-menu-inst/logo-menu-inst.component";

@Component({
  selector: 'app-miopia-inst-result',
  standalone: true,
  imports: [RouterLink, NgIf, LogoMenuComponent, LogoMenuInstComponent],
  templateUrl: './miopia-inst-result.component.html',
  styleUrl: './miopia-inst-result.component.css'
})
export class MiopiaInstResultComponent {
  result: MiopiaResult;
  userInstId =  String(this.authService.getUserIdFromToken())

  jogada: Jogada = {
    NomeJogo: "Miopia",
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

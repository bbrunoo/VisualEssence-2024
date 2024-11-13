import { Component } from '@angular/core';
import { MiopiaInstService } from '../../MiopiaInst/Services/miopia-inst.service';
import { AuthService } from '../../../../../Services/Auth/AuthService/auth.service';
import { MiopiaResult } from '../../../../Models/MiopiaGame/miopiaResult.model';
import { Jogada } from '../../../../Models/MiopiaGame/jogada.model';
import { LogoMenuInstComponent } from "../../../SharedMenu/logo-menu-inst/logo-menu-inst.component";
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-miopia-letras-inst-resultado',
  standalone: true,
  imports: [LogoMenuInstComponent, NgIf, NgFor, RouterLink],
  templateUrl: './miopia-letras-inst-resultado.component.html',
  styleUrl: './miopia-letras-inst-resultado.component.css'
})
export class MiopiaLetrasInstResultadoComponent {
  result: MiopiaResult;
  userInstId =  String(this.authService.getUserIdFromToken())

  jogada: Jogada = {
    NomeJogo: "Miopia Letras",
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

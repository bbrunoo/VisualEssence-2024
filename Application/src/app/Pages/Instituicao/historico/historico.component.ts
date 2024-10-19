import { AuthService } from './../../../../Services/Auth/AuthService/auth.service';
import { VlibrasComponent } from './../../vlibras/vlibras.component';
import { Component, OnInit } from '@angular/core';
import { InstMenuComponent } from "../shared-menu/inst-menu/inst-menu.component";
import { RouterLink } from '@angular/router';
import { HistoricoService } from '../Services/historico-service/historico.service';
import { NgFor, NgIf } from '@angular/common';
import { Historico } from '../../../Models/historico.model';
import { Jogada } from '../../../Models/MiopiaGame/jogada.model';

@Component({
  selector: 'app-historico',
  standalone: true,
  imports: [VlibrasComponent, InstMenuComponent, RouterLink, NgFor, NgIf],
  templateUrl: './historico.component.html',
  styleUrl: './historico.component.css'
})
export class HistoricoComponent implements OnInit {
  historico: Historico[] = [];
  miopia = "Miopia";
  daltonismo = "Daltonismo";
  figurascoloridas = "Figuras Coloridas";

  userInstId = String(this.authService.getUserIdFromToken());

  constructor(private historicoService: HistoricoService, private authService:AuthService) {}

  ngOnInit(): void {
    this.getHistoricoMiopia();
  }

  truncateName(name: string): string {
    const names = name.split(' ');
    if (names.length > 1) {
      const firstName = names[0];
      const lastName = names[names.length - 1];
      return `${firstName} ${lastName}`;
    }
    return name;
  }

  getHistoricoMiopia() {
    this.historicoService.getHistoricoMiopia(this.miopia, this.userInstId).subscribe(
      response => {
        console.log('Salas carregadas com sucesso!', response);
        this.historico = response;
        console.log("miopia: ", response);
      },
      error => {
        console.error('Não foi possível carregar as salas!', error);
      }
    )
  }

  getHistoricoDaltonismo() {
    this.historicoService.getHistoricoDaltonismo(this.daltonismo, this.userInstId).subscribe(
      response => {
        console.log('Salas carregadas com sucesso!', response);
        this.historico = response;
        console.log("daltno: ", response);
      },
      error => {
        console.error('Não foi possível carregar as salas!', error);
      }
    )
  }

  getHistoricoFigurasColoridas() {
    this.historicoService.getHistoricoFigurasColoridas(this.figurascoloridas, this.userInstId).subscribe(
      response => {
        console.log('Salas carregadas com sucesso!', response);
        this.historico = response;
        console.log("Figuras coloridas: ", response);
      },
      error => {
        console.error('Não foi possível carregar as salas!', error);
      }
    )
  }
}

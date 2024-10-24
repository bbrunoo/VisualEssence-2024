import { HistoricoService } from './../Service/historico.service';
import { Component } from '@angular/core';
import { Historico } from '../../../Models/historico.model';
import { VlibrasComponent } from '../../vlibras/vlibras.component';
import { HeaderComponent } from '../Shared-Pais/header/header.component';
import { NgFor, NgIf } from '@angular/common';
import { LogoMenuComponent } from "../../SharedMenu/logo-menu/logo-menu.component";
import { AuthService } from '../../../../Services/Auth/AuthService/auth.service';

@Component({
  selector: 'app-historico-pais',
  standalone: true,
  imports: [VlibrasComponent, HeaderComponent, NgIf, NgFor, LogoMenuComponent],
  templateUrl: './historico-pais.component.html',
  styleUrl: './historico-pais.component.css'
})
export class HistoricoPaisComponent {
  historico: Historico[] = [];
  miopia = "Miopia";
  daltonismo = "Daltonismo";
  figurascoloridas = "Figuras Coloridas";
  jogoSelecionado: string = '';
  userInstId = String(this.authService.getUserIdFromToken());

  constructor(private historicoService: HistoricoService, private authService:AuthService) {}

  ngOnInit(): void {
    this.getHistoricoMiopia();
    this.getHistoricoFigurasColoridas();
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

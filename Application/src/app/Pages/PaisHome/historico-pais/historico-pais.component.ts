import { HistoricoService } from './../Service/historico.service';
import { Component } from '@angular/core';
import { Historico } from '../../../Models/historico.model';
import { VlibrasComponent } from '../../vlibras/vlibras.component';
import { HeaderComponent } from '../Shared-Pais/header/header.component';
import { NgFor, NgIf } from '@angular/common';
import { LogoMenuComponent } from "../../SharedMenu/logo-menu/logo-menu.component";

@Component({
  selector: 'app-historico-pais',
  standalone: true,
  imports: [VlibrasComponent, HeaderComponent, NgIf, NgFor, LogoMenuComponent],
  templateUrl: './historico-pais.component.html',
  styleUrl: './historico-pais.component.css'
})
export class HistoricoPaisComponent {
  historico: Historico[] = [];
  jogoSelecionado: string = '';

  constructor(private historicoService: HistoricoService) {}

  ngOnInit(): void {
    this.getHistoricoMiopia();
    this.getHistoricoFigurasColoridas();
  }

  getHistoricoMiopia(): void {
    this.historicoService.getHistoricoMiopia().subscribe({
      next: (dadosTratados) => {
        this.historico = dadosTratados;
        this.jogoSelecionado = 'Miopia';
        console.log("dados cianca", this.historico);
      },
      error: (err) => {
        console.error("Erro ao obter o histórico de Miopia", err);
      }
    });
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

  getHistoricoDaltonismo(): void {
    this.historicoService.getHistoricoDaltonismo().subscribe({
      next: (dadosTratados) => {
        this.historico = dadosTratados;
        this.jogoSelecionado = 'Daltonismo';
      },
      error: (err) => {
        console.error("Erro ao obter o histórico de Daltonismo", err);
      }
    });
  }

  getHistoricoFigurasColoridas(): void {
    this.historicoService.getHistoricoFigurasColoridas().subscribe({
      next: (dadosTratados) => {
        this.historico = dadosTratados;
        this.jogoSelecionado = 'Figuras Coloridas';
        console.log("dados cianca", this.historico);
      },
      error: (err) => {
        console.error("Erro ao obter o histórico de Figuras Coloridas", err);
      }
    });
  }
}

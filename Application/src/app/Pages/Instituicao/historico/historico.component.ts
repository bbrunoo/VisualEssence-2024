import { VlibrasComponent } from './../../vlibras/vlibras.component';
import { Component, OnInit } from '@angular/core';
import { InstMenuComponent } from "../shared-menu/inst-menu/inst-menu.component";
import { RouterLink } from '@angular/router';
import { HistoricoService } from '../Services/historico-service/historico.service';
import { NgFor, NgIf } from '@angular/common';
import { Historico } from '../../../Models/historico.model';

@Component({
  selector: 'app-historico',
  standalone: true,
  imports: [VlibrasComponent, InstMenuComponent, RouterLink, NgFor, NgIf],
  templateUrl: './historico.component.html',
  styleUrl: './historico.component.css'
})
export class HistoricoComponent implements OnInit {
  historico: Historico[] = [];
  jogoSelecionado: string = ''; // Para controlar qual jogo está sendo exibido

  constructor(private historicoService: HistoricoService) {}

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

  getHistoricoMiopia(): void {
    this.historicoService.getHistoricoComCriancaMiopia().subscribe({
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

  getHistoricoDaltonismo(): void {
    this.historicoService.getHistoricoComCriancaDaltonismo().subscribe({
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
    this.historicoService.getHistoricoComCriancaFigurasColoridas().subscribe({
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

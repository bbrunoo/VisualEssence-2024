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
  jogoSelecionado: string = ''; // Para controlar qual jogo está sendo exibido

  constructor(private historicoService: HistoricoService) {}

  ngOnInit(): void {
    // Inicializa com um jogo, por exemplo, Miopia
    this.getHistoricoMiopia();
  }

  // Métodos para obter histórico com criança para cada jogo
  getHistoricoMiopia(): void {
    this.historicoService.getHistoricoComCriancaMiopia().subscribe({
      next: (dadosTratados) => {
        this.historico = dadosTratados;
        this.jogoSelecionado = 'Miopia'; // Define o jogo selecionado
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
        this.jogoSelecionado = 'Daltonismo'; // Define o jogo selecionado
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
        this.jogoSelecionado = 'Figuras Coloridas'; // Define o jogo selecionado
        console.log("dados cianca", this.historico);
      },
      error: (err) => {
        console.error("Erro ao obter o histórico de Figuras Coloridas", err);
      }
    });
  }
}

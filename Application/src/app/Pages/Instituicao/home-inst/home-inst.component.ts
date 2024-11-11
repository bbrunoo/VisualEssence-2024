import { DadosService } from './../Services/dados-graficos-service/dados.service';
import { VlibrasComponent } from './../../vlibras/vlibras.component';
import { Component, OnInit, ElementRef, ViewChild, Inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIf } from '@angular/common';
import { InstMenuComponent } from '../shared-menu/inst-menu/inst-menu.component';
import {
  Chart,
  PieController,
  ArcElement,
  BarController,
  BarElement,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { DadosGraficos } from '../../../Models/DadosGraficos.model';
import { AuthService } from '../../../../Services/Auth/AuthService/auth.service';
import { ChatBotIconeComponent } from '../../chat-bot-conteudo/chat-bot-icone/chat-bot-icone.component';

@Component({
  selector: 'app-home-inst',
  standalone: true,
  imports: [VlibrasComponent, InstMenuComponent, ChatBotIconeComponent],
  templateUrl: './home-inst.component.html',
  styleUrls: ['./home-inst.component.css']
})
export class HomeInstComponent implements OnInit {
  @ViewChild('meuCanvas1', { static: true }) canvas1!: ElementRef<HTMLCanvasElement>;
  @ViewChild('meuCanvas2', { static: true }) canvas2!: ElementRef<HTMLCanvasElement>;

  dadosGrafico: DadosGraficos | null = null;
  userId = String(this.authService.getUserIdFromToken());
  userMessage = '';

  constructor(private dadosService: DadosService, private authService: AuthService) { }

  delayed: boolean = false;

  getDadosGrafico() {
    this.dadosService.getDadosGrafico(this.userId).subscribe(
      (response) => {
        this.dadosGrafico = response;
        console.log(this.dadosGrafico);

        this.updateCharts(); // Atualiza os gráficos com os dados recebidos
      },
      (error) => {
        console.error(error);
      }
    );
  }

  updateCharts() {
    const data1 = {
      labels: ['Risco de Daltonismo', 'Risco de Miopia', 'Sem Risco'],
      datasets: [
        {
          data: [
            this.dadosGrafico?.DaltonismoRuim || 0,
            this.dadosGrafico?.MiopiaRuim || 0,
            this.dadosGrafico?.NenhumRisco || 0,
          ],
          backgroundColor: Object.values(Utils.CHART_COLORS),
        }
      ]
    };

    const data2 = {
      labels: ['Risco de Daltonismo', 'Risco de Miopia', 'Sem Risco'],
      datasets: [
        {
          label: 'Risco de Daltonismo',
          data: [this.dadosGrafico?.DaltonismoRuim || 0, null, null],
          borderColor: Utils.CHART_COLORS.red,
          backgroundColor: Utils.CHART_COLORS.red,
        },
        {
          label: 'Risco de Miopia',
          data: [null, this.dadosGrafico?.MiopiaRuim || 0, null],
          borderColor: Utils.CHART_COLORS.blue,
          backgroundColor: Utils.CHART_COLORS.blue,
        },
        {
          label: 'Sem Risco',
          data: [null, null, this.dadosGrafico?.NenhumRisco || 0],
          borderColor: Utils.CHART_COLORS.green,
          backgroundColor: Utils.CHART_COLORS.green,
        },
      ]
    };


    // Criando o gráfico de pizza
    new Chart(this.canvas1.nativeElement, {
      type: 'pie',
      data: data1,
      options: {
        responsive: true,
        plugins: {
          tooltip: {
            callbacks: {
              label: function (context) {
                const label = context.chart.data.labels![context.dataIndex];
                const value = context.raw;
                return ` Valor: ${value}`;
              }
            },
            titleFont: {
              size: 14,
            },
            bodyFont: {
              size: 14,
            }
          },
          legend: {
            position: 'top',
            labels: {
              font: {
                size: 15,
              },
              color: 'white',
            }
          },
          title: {
            display: true,
            text: 'Gráfico de Pizza',
            font: {
              size: 17,
            },
            color: 'white',
          }
        },
        animation: {
          animateScale: true,
          animateRotate: true,
          duration: 2000,
        }
      }
    });

    // Criando o gráfico de barras
    new Chart(this.canvas2.nativeElement, {
      type: 'bar',
      data: data2,
      options: {
        responsive: true,
        animation: {
          onComplete: () => {
            this.delayed = true;
          },
          delay: (context) => {
            let delay = 0;
            if (context.type === 'data' && context.mode === 'default' && !this.delayed) {
              delay = context.dataIndex * 300 + context.datasetIndex * 100;
            }
            return delay;
          },
        },
        plugins: {
          tooltip: {
            titleFont: {
              size: 14,
            },
            bodyFont: {
              size: 14,
            }
          },
          legend: {
            position: 'top',
            labels: {
              font: {
                size: 15,
              },
              color: 'white',
            }
          },
          title: {
            display: true,
            text: 'Gráfico de Barras',
            font: {
              size: 17,
            },
            color: 'white',
          }
        },
        scales: {
          x: {
            stacked: false,
            grid: {
              color: '#748285',
            },
            ticks: {
              color: '#b8c4c3',
              font: {
                size: 12,
              }
            }
          },
          y: {
            stacked: false,
            grid: {
              color: '#748285'
            },
            ticks: {
              color: '#b8c4c3',
              font: {
                size: 12,
              }
            }
          }
        },
        indexAxis: 'x',
      }
    });
  }

  ngOnInit() {
    this.getDadosGrafico();
    Chart.register(PieController, ArcElement, BarController, BarElement, LineController, LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);
  }
}

class Utils {
  static CHART_COLORS = {
    blue: '#0870ff',
    red: '#ab0000',
    yellow: '#ffe92d',
    green: '#5fb40f',
  };

  static numbers(config: { count: number; min: number; max: number }): number[] {
    const { count, min, max } = config;
    const data: number[] = [];
    for (let i = 0; i < count; i++) {
      data.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return data;
  }

  static age(config: { count: number }): string[] {
    const { count } = config;
    const age = ['3/4 anos', '5/6 anos', '7/8 anos', '9/10 anos'];
    return age.slice(0, count);
  }
}

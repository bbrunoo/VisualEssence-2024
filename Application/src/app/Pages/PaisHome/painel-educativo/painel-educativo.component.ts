import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIf } from '@angular/common';
//Importação dos módulos necessários para a implementação dos gráficos
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

@Component({
  selector: 'app-painel-educativo',
  standalone: true,
  imports: [RouterLink, NgIf, RouterLinkActive],
  templateUrl: './painel-educativo.component.html',
  styleUrl: './painel-educativo.component.css'
})
export class PainelEducativoComponent {

  //Decorador para acessar o elemento Canvas no HTML, permitindo a inserção dos gráficos
  @ViewChild('meuCanvas1', { static: true }) canvas1!: ElementRef<HTMLCanvasElement>;
  @ViewChild('meuCanvas2', { static: true }) canvas2!: ElementRef<HTMLCanvasElement>;

  delayed: boolean = false;

  //Método do ciclo de vida do Angular, executado assim que o componente é inicializado
  //A lógica para configurar os gráficos vai aqui
  ngOnInit() {
    // Registrando os módulos importados
    Chart.register(PieController, ArcElement, BarController, BarElement, LineController, LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

    const data_count = 4;
    const number_cfg = { count: data_count, min: 0, max: 2000 };
    //Variáveis especificando contagem e valores min e max
    const DATA_COUNT = 4;
    const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 2000 };

    //Dados (rótulos e cores) do gráfico de pizza
    const data1 = {
      labels: ['Risco de Daltonismo', 'Risco de Miopia', 'Sem Risco', 'Não Finalizado'],
      datasets: [
        {
          data: Utils.numbers(number_cfg),
          backgroundColor: Object.values(Utils.CHART_COLORS),
        }
      ]
    };

    //Dados do gráfico de barras
    const labels = Utils.age({ count: 4 });
    const data2 = {
      labels: labels,
      datasets: [
        {
          label: 'Risco de Daltonismo',
          data: Utils.numbers(NUMBER_CFG),
          borderColor: Utils.CHART_COLORS.red,
          backgroundColor: Utils.CHART_COLORS.red,
        },
        {
          label: 'Risco de Miopia',
          data: Utils.numbers(NUMBER_CFG),
          borderColor: Utils.CHART_COLORS.blue,
          backgroundColor: Utils.CHART_COLORS.blue,
        },
        {
          label: 'Sem Risco',
          data: Utils.numbers(NUMBER_CFG),
          borderColor: Utils.CHART_COLORS.green,
          backgroundColor: Utils.CHART_COLORS.green,
        },
        {
          label: 'Não Finalizado',
          data: Utils.numbers(NUMBER_CFG),
          borderColor: Utils.CHART_COLORS.yellow,
          backgroundColor: Utils.CHART_COLORS.yellow,
        },
      ]
    };

    //Cria o gráfico de pizza (tooltip, legenda, título e animação)
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

                return `Valor: ${label} - ${value}`;
              }
            },
            titleFont: {
              size: 14,
              //family:'',
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
                //family:'',
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

    //Cria o gráfico de barras (tooltip, legenda, título, animação e configurações de escala)
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
              //family:'',
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
                //family:'',
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
}

//Classe Utilitária
class Utils {
  //Objeto com cores pré-definidas para uso nos gráficos
  static CHART_COLORS = {
    blue: '#0870ff',
    red: '#ab0000',
    yellow: '#ffe92d',
    green: '#5fb40f',
  };

  //Numbers e Age: dois métodos que geram números aleatórios
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
    //Lista de idades
    const age = ['3/4 anos', '5/6 anos', '7/8 anos', '9/10 anos'];
    return age.slice(0, count);
  }
}
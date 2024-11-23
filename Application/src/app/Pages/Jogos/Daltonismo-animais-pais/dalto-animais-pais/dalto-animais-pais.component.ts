import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';


interface DaltonismoPhase {
  questionImage: string;
  buttons: string[];
  correctButton: string;
}

@Component({
  selector: 'app-dalto-animais-pais',
  standalone: true,
  imports: [NgFor],
  templateUrl: './dalto-animais-pais.component.html',
  styleUrl: './dalto-animais-pais.component.css'
})
export class DaltoAnimaisPaisComponent {
  fases: DaltonismoPhase[] = [];
  faseAtual: number = 0;
  result = { score: 0, errors: 0 };

  constructor(private router: Router) {
    this.iniciarFases();
  }

  iniciarFases() {
    const fasesData = [
      { questionImage: '../../../../../assets/DaltonismoImages/Pato1.jpeg', correctButton: '../../../../../assets/DaltonismoImages/btn-pato.png' },
      { questionImage: '../../../../../assets/DaltonismoImages/Girafa.jpeg', correctButton: '../../../../../assets/DaltonismoImages/btn-girafa.png' },
      { questionImage: '../../../../../assets/DaltonismoImages/Esquilo.jpeg', correctButton: '../../../../../assets/DaltonismoImages/btn-esquilo.png' },
      { questionImage: '../../../../../assets/DaltonismoImages/Pinguim.jpeg', correctButton: '../../../../../assets/DaltonismoImages/btn-pinguim.png' },
      { questionImage: '../../../../../assets/DaltonismoImages/Vaca.jpeg', correctButton: '../../../../../assets/DaltonismoImages/btn-vaca.png' },
      { questionImage: '../../../../../assets/DaltonismoImages/Cachorro.jpeg', correctButton: '../../../../../assets/DaltonismoImages/btn-cachorro.png' },
      { questionImage: '../../../../../assets/DaltonismoImages/Gato1.jpeg', correctButton: '../../../../../assets/DaltonismoImages/btn-gato.png' },
      { questionImage: '../../../../../assets/DaltonismoImages/Urso.jpeg', correctButton: '../../../../../assets/DaltonismoImages/btn-urso.png' },
      { questionImage: '../../../../../assets/DaltonismoImages/Elefante.jpeg', correctButton: '../../../../../assets/DaltonismoImages/btn-elefante.png' },
      { questionImage: '../../../../../assets/DaltonismoImages/Canguru.jpeg', correctButton: '../../../../../assets/DaltonismoImages/btn-canguru.png' },
      { questionImage: '../../../../../assets/DaltonismoImages/Polvo.jpeg', correctButton: '../../../../../assets/DaltonismoImages/btn-polvo.png' },
      { questionImage: '../../../../../assets/DaltonismoImages/Cervo.jpeg', correctButton: '../../../../../assets/DaltonismoImages/btn-cervo.png' },
      { questionImage: '../../../../../assets/DaltonismoImages/Cobra.jpeg', correctButton: '../../../../../assets/DaltonismoImages/btn-cobra.png' },
      { questionImage: '../../../../../assets/DaltonismoImages/Coelho.jpeg', correctButton: '../../../../../assets/DaltonismoImages/btn-coelho.png' },
      { questionImage: '../../../../../assets/DaltonismoImages/Morcego.jpeg', correctButton: '../../../../../assets/DaltonismoImages/btn-morcego.png' },
      { questionImage: '../../../../../assets/DaltonismoImages/Peixe2.jpeg', correctButton: '../../../../../assets/DaltonismoImages/btn-peixe.png' },
      { questionImage: '../../../../../assets/DaltonismoImages/Coelho3.jpeg', correctButton: '../../../../../assets/DaltonismoImages/btn-coelho.png' },
      { questionImage: '../../../../../assets/DaltonismoImages/Galo.jpeg', correctButton: '../../../../../assets/DaltonismoImages/btn-galo.png' },
      { questionImage: '../../../../../assets/DaltonismoImages/Gato2.jpeg', correctButton: '../../../../../assets/DaltonismoImages/btn-gato.png' },
      { questionImage: '../../../../../assets/DaltonismoImages/Pato2.jpeg', correctButton: '../../../../../assets/DaltonismoImages/btn-pato.png' },
      { questionImage: '../../../../../assets/DaltonismoImages/Golfinho.jpeg', correctButton: '../../../../../assets/DaltonismoImages/btn-golfinho.png' },
      { questionImage: '../../../../../assets/DaltonismoImages/Coelho2.jpeg', correctButton: '../../../../../assets/DaltonismoImages/btn-coelho.png' },
      { questionImage: '../../../../../assets/DaltonismoImages/Lesma.jpeg', correctButton: '../../../../../assets/DaltonismoImages/btn-lesma.png' },
      { questionImage: '../../../../../assets/DaltonismoImages/Passaro.jpeg', correctButton: '../../../../../assets/DaltonismoImages/btn-passaro.png' },
      { questionImage: '../../../../../assets/DaltonismoImages/Pato3.jpeg', correctButton: '../../../../../assets/DaltonismoImages/btn-pato.png' },
      { questionImage: '../../../../../assets/DaltonismoImages/Peixe.jpeg', correctButton: '../../../../../assets/DaltonismoImages/btn-peixe.png' },
      { questionImage: '../../../../../assets/DaltonismoImages/Tartaruga.jpeg', correctButton: '../../../../../assets/DaltonismoImages/btn-tartaruga.png' },
    ];

    const allButtons = [
      '../../../../../assets/DaltonismoImages/btn-elefante.png',
      '../../../../../assets/DaltonismoImages/btn-gato.png',
      '../../../../../assets/DaltonismoImages/btn-pato.png',
      '../../../../../assets/DaltonismoImages/btn-girafa.png',
      '../../../../../assets/DaltonismoImages/btn-esquilo.png',
      '../../../../../assets/DaltonismoImages/btn-pinguim.png',
      '../../../../../assets/DaltonismoImages/btn-urso.png',
      '../../../../../assets/DaltonismoImages/btn-cervo.png',
      '../../../../../assets/DaltonismoImages/btn-polvo.png',
      '../../../../../assets/DaltonismoImages/btn-vaca.png',
      '../../../../../assets/DaltonismoImages/btn-borboleta.png',
      '../../../../../assets/DaltonismoImages/btn-cachorro.png',
      '../../../../../assets/DaltonismoImages/btn-canguru.png',
      '../../../../../assets/DaltonismoImages/btn-cobra.png',
      '../../../../../assets/DaltonismoImages/btn-coelho.png',
      '../../../../../assets/DaltonismoImages/btn-galo.png',
      '../../../../../assets/DaltonismoImages/btn-golfinho.png',
      '../../../../../assets/DaltonismoImages/btn-lesma.png',
      '../../../../../assets/DaltonismoImages/btn-morcego.png',
      '../../../../../assets/DaltonismoImages/btn-passaro.png',
      '../../../../../assets/DaltonismoImages/btn-peixe.png',
      '../../../../../assets/DaltonismoImages/btn-tartaruga.png',
    ];

    this.fases = fasesData.map((fase) => {
      const randomButtons = this.obterAleatorios(allButtons, 7, fase.correctButton);
      const buttons = this.embaralharArray([...randomButtons, fase.correctButton]);
      return { questionImage: fase.questionImage, buttons, correctButton: fase.correctButton };
    });
  }

  embaralharArray(array: any[]): any[] {
    return array.sort(() => Math.random() - 0.5);
  }

  obterAleatorios(array: string[], count: number, exclude: string): string[] {
    const filtered = array.filter((item) => item !== exclude);
    const result: string[] = [];
    while (result.length < count && filtered.length > 0) {
      const randomIndex = Math.floor(Math.random() * filtered.length);
      result.push(filtered.splice(randomIndex, 1)[0]);
    }
    return result;
  }

  verificarResposta(botaoSelecionado: string) {
    if (botaoSelecionado === this.fases[this.faseAtual].correctButton) {
      this.result.score++;
    } else {
      this.result.errors++;
    }
    this.proximaFase();
  }

  proximaFase() {
    if (this.faseAtual < this.fases.length - 1) {
      this.faseAtual++;
    } else {
      this.router.navigate(['/Pais/jogos/daltonismo-animais/resultado'], { state: { data: this.result } });
    }
  }

  pularFase() {
    this.proximaFase();
  }
}

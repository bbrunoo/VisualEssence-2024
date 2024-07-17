import { Component} from '@angular/core';
import { MiopiaGamePhase } from '../../../../Models/MiopiaGame/miopia.model';
import { NgFor, NgIf } from '@angular/common';
import { MiopiaResult } from '../../../../Models/MiopiaGame/miopiaResult.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-miopia-game',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './miopia-game.component.html',
  styleUrl: './miopia-game.component.css'
})
export class MiopiaGameComponent{

  //   export interface MiopiaGame {
  //   id: number;
  //   name: string;
  //   points: number;
  // }
  constructor(private router: Router){}

  fase: MiopiaGamePhase[] = [
    { question: 'FASE 1', questionImage: ['1.png', '2.png', '3.png'], correctQuestion: '2.png' },
    { question: 'FASE 2', questionImage: ['1.png', '2.png', '3.png'], correctQuestion: '3.png' },
    { question: 'FASE 3', questionImage: ['1.png', '2.png', '3.png'], correctQuestion: '2.png' },
    { question: 'FASE 4', questionImage: ['1.png', '2.png', '3.png'], correctQuestion: '1.png' },
    { question: 'FASE 5', questionImage: ['1.png', '2.png', '3.png'], correctQuestion: '2.png' },
    { question: 'FASE 6', questionImage: ['1.png', '2.png', '3.png'], correctQuestion: '1.png' },
    { question: 'FASE 7', questionImage: ['1.png', '2.png', '3.png'], correctQuestion: '2.png' },
    { question: 'FASE 8', questionImage: ['1.png', '2.png', '3.png'], correctQuestion: '2.png' },
  ];

  faseAtual: number = 0;
  result: MiopiaResult = { score: 0, errors: 0 }

  checkAnswer(option: string) {
  if (option === this.fase[this.faseAtual].correctQuestion) this.result.score++;
  else this.result.errors++;
  this.nextPhase();
  }

  nextPhase() {
      if (this.faseAtual < this.fase.length - 1) {
      this.faseAtual++;
    }
    else
    {
      this.router.navigate(['/jogos/miopia/result'], {state: {data: this.result}})
    }
    console.log('acertos: '+ this.result.score, 'erros: '+ this.result.errors);
  }
}

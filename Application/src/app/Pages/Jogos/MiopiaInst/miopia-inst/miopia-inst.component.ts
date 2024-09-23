import { Component } from '@angular/core';
import { MiopiaResult } from '../../../../Models/MiopiaGame/miopiaResult.model';
import { MiopiaGamePhase } from '../../../../Models/MiopiaGame/miopia.model';
import { Router } from '@angular/router';
import { LogoMenuComponent } from '../../../SharedMenu/logo-menu/logo-menu.component';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-miopia-inst',
  standalone: true,
  imports: [NgIf, NgFor, LogoMenuComponent],
  templateUrl: './miopia-inst.component.html',
  styleUrl: './miopia-inst.component.css'
})
export class MiopiaInstComponent {

  constructor(private router: Router) {
    this.startGame();
  }

  allImages: string[] = [
    '../../../../../assets/MiopiaImages/balao.png',
    '../../../../../assets/MiopiaImages/baleia.png',
    '../../../../../assets/MiopiaImages/sol.png',
    '../../../../../assets/MiopiaImages/carro.png',
    '../../../../../assets/MiopiaImages/girassol.png',
    '../../../../../assets/MiopiaImages/pirulito.png',
    '../../../../../assets/MiopiaImages/guarda-chuva.png',
    '../../../../../assets/MiopiaImages/sorvete.png',
    '../../../../../assets/MiopiaImages/astronauta.png',
    '../../../../../assets/MiopiaImages/bola.png',
    '../../../../../assets/MiopiaImages/camera.png',
    '../../../../../assets/MiopiaImages/arvore.png',
    '../../../../../assets/MiopiaImages/galinha.png',
    '../../../../../assets/MiopiaImages/urso.png'
  ];


  fase: MiopiaGamePhase[] = [
    { question: 'FASE 1', questionImage: [], correctQuestion: '' },
    { question: 'FASE 2', questionImage: [], correctQuestion: '' },
    { question: 'FASE 3', questionImage: [], correctQuestion: '' },
    { question: 'FASE 4', questionImage: [], correctQuestion: '' },
    { question: 'FASE 5', questionImage: [], correctQuestion: '' },
    { question: 'FASE 6', questionImage: [], correctQuestion: '' },
    { question: 'FASE 7', questionImage: [], correctQuestion: '' },
    { question: 'FASE 8', questionImage: [], correctQuestion: '' },
    { question: 'FASE 9', questionImage: [], correctQuestion: '' },
    { question: 'FASE 10', questionImage: [], correctQuestion: '' },
    { question: 'FASE 11', questionImage: [], correctQuestion: '' },
    { question: 'FASE 12', questionImage: [], correctQuestion: '' },
    { question: 'FASE 13', questionImage: [], correctQuestion: '' },
    { question: 'FASE 14', questionImage: [], correctQuestion: '' },
    { question: 'FASE 15', questionImage: [], correctQuestion: '' },
  ];


  faseAtual: number = 0;
  result: MiopiaResult = { score: 0, errors: 0 };

  getQuestionImageSize(): string {
    const baseSize = 12;
    const sizeDecrease = 0.8;
    const newSize = baseSize - this.faseAtual * sizeDecrease;
    return `${newSize}em`;
  }


  startGame() {
    this.fase.forEach((fase, index) => {
      fase.questionImage = this.getRandomImages(3);
    });
    this.setQuestionImage();
    this.shuffleOptions();
  }

  getRandomImages(count: number): string[] {
    const shuffledImages = [...this.allImages];
    for (let i = shuffledImages.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledImages[i], shuffledImages[j]] = [shuffledImages[j], shuffledImages[i]];
    }
    return shuffledImages.slice(0, count);
  }
  setQuestionImage() {
    const options = this.fase[this.faseAtual].questionImage;
    const randomIndex = Math.floor(Math.random() * options.length);
    this.fase[this.faseAtual].correctQuestion = options[randomIndex];
  }

  shuffleOptions() {
    this.fase[this.faseAtual].questionImage = this.shuffleArray(this.fase[this.faseAtual].questionImage);
  }

  checkAnswer(option: string) {
    if (option === this.fase[this.faseAtual].correctQuestion) {
      this.result.score++;
    } else {
      this.result.errors++;
    }
    this.nextPhase();
  }

  shuffleArray<T>(array: T[]): T[] {
    return array.sort(() => Math.random() - 0.5);
  }

  nextPhase() {
    if (this.faseAtual < this.fase.length - 1) {
      this.faseAtual++;
      this.setQuestionImage();
      this.shuffleOptions();
    } else {
      this.router.navigate(['/instituicao/jogos/miopia/result'], { state: { data: this.result } });
    }
  }

  skipPhase() {
    this.nextPhase();
  }
}

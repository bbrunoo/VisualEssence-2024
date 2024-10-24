import { Component } from '@angular/core';
import { MiopiaGamePhase } from '../../../../Models/MiopiaGame/miopia.model';
import { NgFor, NgIf } from '@angular/common';
import { MiopiaResult } from '../../../../Models/MiopiaGame/miopiaResult.model';
import { Router } from '@angular/router';
import { LogoMenuComponent } from '../../../SharedMenu/logo-menu/logo-menu.component';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { VlibrasComponent } from '../../../vlibras/vlibras.component';

@Component({
  selector: 'app-miopia-game',
  standalone: true,
  imports: [NgIf, NgFor, LogoMenuComponent, VlibrasComponent],
  templateUrl: './miopia-game.component.html',
  styleUrls: ['./miopia-game.component.css'],
  animations: [
    trigger('fadeAnimation', [
      state('void', style({ opacity: 0 })),
      transition('void <=> *', [animate('300ms ease-in-out')]),
    ]),
  ],
})
export class MiopiaGameComponent {
  lastCorrectImage: string | null = null;
  remainingImages: string[];

  constructor(private router: Router) {
    this.remainingImages = [...this.allImages];
    this.validateImageCount();
    this.startGame();
  }

  allImages: string[] = [
    '../../../../../assets/MiopiaImages/alien.png',
    '../../../../../assets/MiopiaImages/arvore.png',
    '../../../../../assets/MiopiaImages/astronauta.png',
    '../../../../../assets/MiopiaImages/balao.png',
    '../../../../../assets/MiopiaImages/baleia.png',
    '../../../../../assets/MiopiaImages/barco.png',
    '../../../../../assets/MiopiaImages/bicicleta.png',
    '../../../../../assets/MiopiaImages/boi.png',
    '../../../../../assets/MiopiaImages/bola.png',
    '../../../../../assets/MiopiaImages/bolinho.png',
    '../../../../../assets/MiopiaImages/bone.png',
    '../../../../../assets/MiopiaImages/cachorro.png',
    '../../../../../assets/MiopiaImages/camera.png',
    '../../../../../assets/MiopiaImages/chave.png',
    '../../../../../assets/MiopiaImages/controle.png',
    '../../../../../assets/MiopiaImages/coracao.png',
    '../../../../../assets/MiopiaImages/flor.png',
    '../../../../../assets/MiopiaImages/foguete.png',
    '../../../../../assets/MiopiaImages/fone.png',
    '../../../../../assets/MiopiaImages/galinha.png',
    '../../../../../assets/MiopiaImages/gato.png',
    '../../../../../assets/MiopiaImages/girassol.png',
    '../../../../../assets/MiopiaImages/lapis.png',
    '../../../../../assets/MiopiaImages/lata.png',
    '../../../../../assets/MiopiaImages/lupa.png',
    '../../../../../assets/MiopiaImages/maca.png',
    '../../../../../assets/MiopiaImages/martelo.png',
    '../../../../../assets/MiopiaImages/microfone.png',
    '../../../../../assets/MiopiaImages/mouse.png',
    '../../../../../assets/MiopiaImages/osso.png',
    '../../../../../assets/MiopiaImages/sino.png',
    '../../../../../assets/MiopiaImages/sorvete.png',
    '../../../../../assets/MiopiaImages/spray.png',
    '../../../../../assets/MiopiaImages/tenis.png',
    '../../../../../assets/MiopiaImages/trevo.png',
    '../../../../../assets/MiopiaImages/tucano.png',
    '../../../../../assets/MiopiaImages/urso.png',
    '../../../../../assets/MiopiaImages/vassoura.png',
    '../../../../../assets/MiopiaImages/violao.png',
    '../../../../../assets/MiopiaImages/visao.png',
    '../../../../../assets/MiopiaImages/moto.png',
    '../../../../../assets/MiopiaImages/ventilador.png',
    '../../../../../assets/MiopiaImages/capacete.png',
    '../../../../../assets/MiopiaImages/caixa.png',
    '../../../../../assets/MiopiaImages/computador.png',
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

  validateImageCount() {
    const totalImagesRequired = this.fase.length * 3;
    if (this.remainingImages.length < totalImagesRequired) {
      throw new Error(`Não há imagens suficientes para ${this.fase.length} fases. Imagens disponíveis: ${this.remainingImages.length}, Imagens necessárias: ${totalImagesRequired}.`);
    }
  }

  startGame() {
    this.fase.forEach((fase, index) => {
      fase.questionImage = this.getRandomImages(3);
    });
    this.setQuestionImage();
    this.shuffleOptions();
  }

  getRandomImages(count: number): string[] {
    const selectedImages = this.remainingImages.slice(0, count);
    this.remainingImages = this.remainingImages.slice(count);

    return selectedImages;
  }

  setQuestionImage() {
    const options = this.fase[this.faseAtual].questionImage;
    const randomIndex = Math.floor(Math.random() * options.length);
    this.fase[this.faseAtual].correctQuestion = options[randomIndex];
    this.lastCorrectImage = this.fase[this.faseAtual].correctQuestion;
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
      this.router.navigate(['/Pais/jogos/miopia/result'], { state: { data: this.result } });    }
  }

  skipPhase() {
    this.nextPhase();
  }
}

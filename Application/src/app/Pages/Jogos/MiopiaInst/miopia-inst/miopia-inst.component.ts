import { Component } from '@angular/core';
import { MiopiaResult } from '../../../../Models/MiopiaGame/miopiaResult.model';
import { MiopiaGamePhase } from '../../../../Models/MiopiaGame/miopia.model';
import { Router } from '@angular/router';
import { LogoMenuComponent } from '../../../SharedMenu/logo-menu/logo-menu.component';
import { NgFor, NgIf } from '@angular/common';
import { LogoMenuInstComponent } from "../../../SharedMenu/logo-menu-inst/logo-menu-inst.component";

@Component({
  selector: 'app-miopia-inst',
  standalone: true,
  imports: [NgIf, NgFor, LogoMenuComponent, LogoMenuInstComponent],
  templateUrl: './miopia-inst.component.html',
  styleUrl: './miopia-inst.component.css'
})
export class MiopiaInstComponent {
  isEyeOpen: boolean = false;
  descricaoImagemAtual: string = 'Descrição da imagem atual para ajudar os pais.';
  lastCorrectImage: string | null = null;

  toggleEye() {
    this.isEyeOpen = !this.isEyeOpen;
  }

  imageDescriptions: { [key: string]: string } = {
    '../../../../../assets/MiopiaImages/alien.png': 'Alienígena',
    '../../../../../assets/MiopiaImages/arvore.png': 'Árvore',
    '../../../../../assets/MiopiaImages/astronauta.png': 'Astronauta',
    '../../../../../assets/MiopiaImages/balao.png': 'Balão',
    '../../../../../assets/MiopiaImages/baleia.png': 'Baleia',
    '../../../../../assets/MiopiaImages/barco.png': 'Barco',
    '../../../../../assets/MiopiaImages/bicicleta.png': 'Bicicleta',
    '../../../../../assets/MiopiaImages/boi.png': 'Boi',
    '../../../../../assets/MiopiaImages/bola.png': 'Bola',
    '../../../../../assets/MiopiaImages/bolinho.png': 'Bolinho',
    '../../../../../assets/MiopiaImages/bone.png': 'Boné',
    '../../../../../assets/MiopiaImages/cachorro.png': 'Cachorro',
    '../../../../../assets/MiopiaImages/camera.png': 'Câmera',
    '../../../../../assets/MiopiaImages/controle.png': 'Controle Remoto',
    '../../../../../assets/MiopiaImages/coracao.png': 'Coração',
    '../../../../../assets/MiopiaImages/flor.png': 'Flor',
    '../../../../../assets/MiopiaImages/foguete.png': 'Foguete',
    '../../../../../assets/MiopiaImages/fone.png': 'Fone de Ouvido',
    '../../../../../assets/MiopiaImages/galinha.png': 'Galinha',
    '../../../../../assets/MiopiaImages/gato.png': 'Gato',
    '../../../../../assets/MiopiaImages/girassol.png': 'Girassol',
    '../../../../../assets/MiopiaImages/lapis.png': 'Lápis',
    '../../../../../assets/MiopiaImages/lata.png': 'Lata',
    '../../../../../assets/MiopiaImages/lupa.png': 'Lupa',
    '../../../../../assets/MiopiaImages/maca.png': 'Maçã',
    '../../../../../assets/MiopiaImages/osso.png': 'Osso',
    '../../../../../assets/MiopiaImages/sino.png': 'Sino',
    '../../../../../assets/MiopiaImages/sorvete.png': 'Sorvete',
    '../../../../../assets/MiopiaImages/trevo.png': 'Trevo',
    '../../../../../assets/MiopiaImages/urso.png': 'Urso',
    '../../../../../assets/MiopiaImages/vassoura.png': 'Vassoura',
    '../../../../../assets/MiopiaImages/violao.png': 'Violão',
    '../../../../../assets/MiopiaImages/oculos.png': 'Óculos',
    '../../../../../assets/MiopiaImages/pessoa.png': 'Homem',
    '../../../../../assets/MiopiaImages/monstro.png': 'Monstro',
  };

  images: string[] = Object.keys(this.imageDescriptions); // Lista de imagens sem restrições

  constructor(private router: Router) {
    this.startGame();
  }

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
    { question: 'FASE 16', questionImage: [], correctQuestion: '' },
    { question: 'FASE 17', questionImage: [], correctQuestion: '' },
    { question: 'FASE 18', questionImage: [], correctQuestion: '' },
    { question: 'FASE 19', questionImage: [], correctQuestion: '' },
    { question: 'FASE 20', questionImage: [], correctQuestion: '' },
  ];


  faseAtual: number = 0;
  result: MiopiaResult = { score: 0, errors: 0 };

  getQuestionImageSize(): string {
    if (this.faseAtual < 4) {
      return '5em';
    } else if (this.faseAtual < 8) {
      return '3.5em';
    } else if (this.faseAtual < 12) {
      return '2.3em';
    } else if (this.faseAtual < 16) {
      return '1.5em';
    } else if (this.faseAtual < 18) {
      return '1em';
    } else {
      return '.5em';
    }
  }

  startGame() {
    this.fase.forEach((fase) => {
      fase.questionImage = this.getRandomImages(1);
    });
    this.setQuestionImage();
    this.shuffleOptions();
  }

   getRandomImages(count: number): string[] {
    const selectedImages: string[] = [];
    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * this.images.length);
      selectedImages.push(this.images[randomIndex]);
    }
    return selectedImages;
  }

  setQuestionImage() {
    const options = this.fase[this.faseAtual].questionImage;
    const randomIndex = Math.floor(Math.random() * options.length);
    this.fase[this.faseAtual].correctQuestion = options[randomIndex];
    this.lastCorrectImage = this.fase[this.faseAtual].correctQuestion;
    this.descricaoImagemAtual = this.imageDescriptions[this.lastCorrectImage] || 'Imagem desconhecida';
  }

  shuffleOptions() {
    this.fase[this.faseAtual].questionImage = this.shuffleArray(this.fase[this.faseAtual].questionImage);
  }

  checkAnswer(option: string) {
    if (option === 'correto') {
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
      this.isEyeOpen = false;
    } else {
      this.router.navigate(['/instituicao/jogos/miopia/result'], { state: { data: this.result } });
    }
  }

  skipPhase() {
    this.nextPhase();
  }
}

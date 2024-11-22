import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LogoMenuInstComponent } from "../../../SharedMenu/logo-menu-inst/logo-menu-inst.component";

interface Image {
  src: string;
  value: number[];
}
@Component({
  selector: 'app-dalto-numeros-inst',
  standalone: true,
  imports: [NgIf, LogoMenuInstComponent],
  templateUrl: './dalto-numeros-inst.component.html',
  styleUrl: './dalto-numeros-inst.component.css'
})
export class DaltoNumerosInstComponent {
  constructor(private router: Router) { }

  previewText: string = '';
  errorCounts: { [key: string]: number } = {};
  allImages: Image[] = [
    { src: '../../../../../assets/DaltonismoNumeros/1-rosa.png', value: [1] },
    { src: '../../../../../assets/DaltonismoNumeros/2-verde-rosa.png', value: [2] },
    { src: '../../../../../assets/DaltonismoNumeros/2-vermelho-escuro.png', value: [2] },
    { src: '../../../../../assets/DaltonismoNumeros/3-azul-escuro.png', value: [3] },
    { src: '../../../../../assets/DaltonismoNumeros/3-vermelho-preto.png', value: [3] },
    { src: '../../../../../assets/DaltonismoNumeros/4-verde-roxo.png', value: [4] },
    { src: '../../../../../assets/DaltonismoNumeros/5-roxo-escuro.png', value: [5] },
    { src: '../../../../../assets/DaltonismoNumeros/6-escuro.png', value: [6] },
    { src: '../../../../../assets/DaltonismoNumeros/6-verde.png', value: [6] },
    { src: '../../../../../assets/DaltonismoNumeros/6-verde-rosa.png', value: [6] },
    { src: '../../../../../assets/DaltonismoNumeros/7-roxo-escuro.png', value: [7] },
    { src: '../../../../../assets/DaltonismoNumeros/7-verde-escuro.png', value: [7] },
    { src: '../../../../../assets/DaltonismoNumeros/7-verde-rosa.png', value: [7] },
    { src: '../../../../../assets/DaltonismoNumeros/8-rosa-escuro.png', value: [8] },
    { src: '../../../../../assets/DaltonismoNumeros/8-verde-rosa.png', value: [8] },
    { src: '../../../../../assets/DaltonismoNumeros/8-vermelho-escuro.png', value: [8] },
    { src: '../../../../../assets/DaltonismoNumeros/9-roxo-escuro.png', value: [9] },
    { src: '../../../../../assets/DaltonismoNumeros/ishihara_16.png', value: [1, 6] },
    { src: '../../../../../assets/DaltonismoNumeros/ishiharaC_42.png', value: [4, 2] },
    { src: '../../../../../assets/DaltonismoNumeros/ishihara_42.png', value: [4, 2] },
    { src: '../../../../../assets/DaltonismoNumeros/ishihara_2.png', value: [2] },
    { src: '../../../../../assets/DaltonismoNumeros/ishihara_3.png', value: [3] },
    { src: '../../../../../assets/DaltonismoNumeros/ishihara_5.png', value: [5] },
    { src: '../../../../../assets/DaltonismoNumeros/ishihara_6.png', value: [6] },
    { src: '../../../../../assets/DaltonismoNumeros/ishihara_7.png', value: [7] },
    { src: '../../../../../assets/DaltonismoNumeros/ishihara_8.png', value: [8] },
    { src: '../../../../../assets/DaltonismoNumeros/ishihara_12.png', value: [1, 2] },
    { src: '../../../../../assets/DaltonismoNumeros/ishihara_29.png', value: [2, 9] },
    { src: '../../../../../assets/DaltonismoNumeros/ishihara_45.png', value: [4, 5] },
    { src: '../../../../../assets/DaltonismoNumeros/ishihara_74.png', value: [7, 4] },
    { src: '../../../../../assets/DaltonismoNumeros/ishihara_97.png', value: [9, 7] },
    { src: '../../../../../assets/DaltonismoNumeros/ishiharaC_6.png', value: [6] },
  ];

  availableImages: Image[] = [];
  currentImage: Image | null = null;
  correctCount: number = 0;
  incorrectCount: number = 0;
  currentPhase: number = 1;

  ngOnInit() {
    this.resetGame();
  }

  resetGame() {
    this.availableImages = [...this.allImages];
    this.correctCount = 0;
    this.incorrectCount = 0;
    this.previewText = '';
    this.currentPhase = 0;
    this.nextImage();
  }

  nextImage() {
    if (this.availableImages.length > 0) {
      const randomIndex = Math.floor(Math.random() * this.availableImages.length);
      this.currentImage = this.availableImages[randomIndex];
      this.availableImages.splice(randomIndex, 1);
      this.previewText = '';
    } else {
      this.navigateToResults();
    }
    this.currentPhase++;
  }

  addToPreview(value: string) {
    if (value === 'NaN') {
      this.previewText = '';
      this.nextImage();
    } else {
      this.previewText += value;
    }
  }

  removeLastCharacter() {
    this.previewText = this.previewText.slice(0, -1);
  }

  submitAnswer() {
    if (this.previewText.trim() === '') {
      Swal.fire({
        title: 'Atenção!',
        text: 'Por favor, insira um valor ou clique em "Não Sei" antes de avançar.',
        imageUrl: '../../../../../assets/DaltonismoNumeros/worried.png',
        imageWidth: 100,
        imageHeight: 100,
        imageAlt: 'Descrição da imagem',
        confirmButtonText: 'OK',
        customClass: {
          title: 'custom-swal-title',
          htmlContainer: 'custom-swal-text',
        },
      });
      return;
    }

    if (this.previewText === 'NaN') {
      this.previewText = '';
      this.nextImage();
      return;
    }

    if (this.currentImage) {
      const userAnswer = this.previewText.split('').map(Number);
      const isCorrect = JSON.stringify(userAnswer) === JSON.stringify(this.currentImage.value);

      if (isCorrect) {
        this.correctCount++;
      } else {
        this.incorrectCount++;
      }
      this.previewText = '';
      this.nextImage();
    }
  }

  navigateToResults() {
    const result = {
      score: this.correctCount,
      errors: this.incorrectCount,
    };

    this.router.navigate(['/instituicao/jogos/daltonismo-numeros/resultado'], { state: { data: result } });
  }
}

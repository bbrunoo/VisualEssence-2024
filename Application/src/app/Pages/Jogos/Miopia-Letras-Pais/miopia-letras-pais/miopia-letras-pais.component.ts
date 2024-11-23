import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgFor, NgIf } from '@angular/common';
import { LogoMenuComponent } from "../../../SharedMenu/logo-menu/logo-menu.component";
import { MiopiaResult } from '../../../../Models/MiopiaGame/miopiaResult.model';

interface ImageConfig {
  img: string;
  initialAngle: number;
  currentAngle: number;
  width: string;
  height: string;
}

interface PhaseConfig {
  images: ImageConfig[];
  correctOrder: number[];
}

@Component({
  selector: 'app-miopia-letras-pais',
  standalone: true,
  imports: [NgFor, NgIf, LogoMenuComponent],
  templateUrl: './miopia-letras-pais.component.html',
  styleUrl: './miopia-letras-pais.component.css'
})
export class MiopiaLetrasPaisComponent {
  phases: PhaseConfig[] = [];
  currentPhaseIndex: number = 0;
  selectedOrder: number[] = [];
  acertos: number = 0;
  erros: number = 0;
  maxImages: number = 0;

  constructor(private router: Router) {
    this.initializePhases();
    this.updateMaxImages();
  }

  initializePhases() {
    const phaseCount = 10;
    this.phases = Array.from({ length: phaseCount }, (_, i) => {
      const size = this.getImageSize(i);
      return this.generatePhase(i + 1, `${size}em`, `${size}em`);
    });
  }

  getImageSize(phaseIndex: number): number {
    const baseSize = 7;
    const minSize = 0.5;

    if (phaseIndex === 0) {
      return baseSize;
    } else if (phaseIndex >= 1 && phaseIndex <= 5) {
      return Math.max(baseSize - phaseIndex * 1.2, minSize + 2);
    } else if (phaseIndex === 6 || phaseIndex === 7) {
      return Math.max(baseSize - (5 * 1.2) - (phaseIndex - 5) * 2.5, minSize + 1.5);
    } else if (phaseIndex === 8) {
      return Math.max(baseSize - (5 * 1.2) - (2 * 2.5) - 4.0, minSize + 0.8);
    } else if (phaseIndex === 9) {
      return Math.max(baseSize - (5 * 1.2) - (2 * 2.5) - 4.0 - 4.5, minSize + 0.5);
    } else if (phaseIndex === 10) {
      return Math.max(baseSize - (5 * 1.2) - (2 * 2.5) - 4.0 - 4.5 - 5.0, minSize);
    } else {
      return minSize;
    }
  }

  generatePhase(imageCount: number, width: string, height: string): PhaseConfig {
    const angles = [0, -180, 90, -90];
    const images: ImageConfig[] = [];

    for (let i = 0; i < imageCount; i++) {
      let angle: number;

      do {
        angle = angles[Math.floor(Math.random() * angles.length)];
      } while (i > 0 && angle === images[i - 1].initialAngle);

      images.push({
        img: '../../../../../assets/miopiaLetras/Letra-Miopia.png',
        initialAngle: angle,
        currentAngle: angle,
        width,
        height,
      });
    }

    return {
      images,
      correctOrder: images.map((image) => image.initialAngle),
    };
  }


  updateMaxImages() {
    this.maxImages = this.phases[this.currentPhaseIndex].images.length;
  }

  onButtonClick(angle: number) {
    if (this.selectedOrder.length < this.maxImages) {
      this.selectedOrder.push(angle);
    }
  }

  removeImageFromSequence(index: number) {
    this.selectedOrder.splice(index, 1);
  }

  onAvancarClick() {
    this.checkOrder();
  }

  checkOrder() {
    const currentPhase = this.phases[this.currentPhaseIndex];

    if (this.selectedOrder.length === currentPhase.correctOrder.length) {
      const isCorrect = this.selectedOrder.every(
        (value, index) => value === currentPhase.correctOrder[index]
      );

      if (isCorrect) {
        this.acertos++;
      } else {
        this.erros++;
        this.showErrorAlert();
      }

      this.nextPhase();
    }
  }

  showErrorAlert() {
    Swal.fire({
      title: 'Você errou!',
      text: 'Tente na próxima fase.',
      imageUrl: '../../../../../assets/miopiaLetras/worried.png',
      imageWidth: 100,
      imageHeight: 100,
      imageAlt: 'Imagem de erro',
      customClass: {
        title: 'custom-swal-title',
        htmlContainer: 'custom-swal-text',
      },
      confirmButtonText: 'OK'
    });
  }

  result: MiopiaResult = { score: 0, errors: 0 };

  nextPhase() {
    this.selectedOrder = [];
    if (this.currentPhaseIndex < this.phases.length - 1) {
      this.currentPhaseIndex++;
      this.updateMaxImages();
    } else {
      this.result.score = this.acertos;
      this.result.errors = this.erros;

      Swal.fire({
        title: 'Você finalizou o jogo!',
        text: 'Verificar diagnóstico.',
        imageUrl: '../../../../../assets/happy-face.png',
        imageWidth: 100,
        imageHeight: 100,
        imageAlt: 'Descrição da imagem',
        customClass: {
          title: 'custom-swal-title',
          htmlContainer: 'custom-swal-text',
        },
        showCancelButton: true,
        confirmButtonText: 'OK',
        cancelButtonText: 'Home'
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/Pais/jogos/letras/result'], { state: { data: this.result } });
        } else if (result.isDismissed) {
          this.router.navigate(['/Pais/Home']);
        }
      });
    }
  }

  confirmNaoEnxergo() {
    Swal.fire({
      title: 'Você não enxerga?',
      text: 'Tem certeza de que não consegue identificar a imagem?',
      imageUrl: '../../../../../assets/sad-face.png',
      imageWidth: 100,
      imageHeight: 100,
      imageAlt: 'Descrição da imagem',
            showCancelButton: true,
      customClass: {
        title: 'custom-swal-title',
        htmlContainer: 'custom-swal-text',
      },
      confirmButtonText: 'Sim',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.nextPhase();
      }
    });
  }

  getImageForAngle(angle: number): string {
    switch (angle) {
      case 0:
        return '../../../../../assets/miopiaLetras/seta-direita.png';
      case -180:
        return '../../../../../assets/miopiaLetras/seta-esquerda.png';
      case 90:
        return '../../../../../assets/miopiaLetras/seta-baixo.png';
      case -90:
        return '../../../../../assets/miopiaLetras/seta-cima.png';
      default:
        return '';
    }
  }

  getTransformStyle(angle: number) {
    return `rotate(${angle}deg)`;
  }
}

import Phaser from 'phaser';

export function create(this: Phaser.Scene): void {
  let correctScore = 0;
  let wrongScore = 0;
  let brushSize = 5;

  const phases: (keyof typeof phaseColors)[] = ['astronauta', 'balao', 'baleia', 'bone', 'carro', 'girassol', 'guarda-chuva', 'sol', 'urso'];

  const phaseColors = {
    'astronauta': 0x0000ff,
    'balao': 0xff0000,
    'baleia': 0x0000ff,
    'bone': 0x0000ff,
    'carro': 0xff0000,
    'girassol': 0xffff00,
    'guarda-chuva': 0x0000ff,
    'sol': 0xffff00,
    'urso': 0x8b4513
  };

  const colorPhrases = {
    'astronauta': 'Utilize a cor <span style="color: #0099ff;">azul</span>',
    'balao': 'Utilize a cor <span style="color: red;">vermelha</span>',
    'carro': 'Utilize a cor <span style="color: red;">vermelha</span>',
    'baleia': 'Utilize a cor <span style="color: #0099ff;">azul</span>',
    'urso': 'Utilize a cor <span style="color: #a85b23;">marrom</span>',
    'bone': 'Utilize a cor <span style="color: #0099ff;">azul</span>',
    'girassol': 'Utilize a cor <span style="color: yellow;">amarela</span>',
    'guarda-chuva': 'Utilize a cor <span style="color: #0099ff;">azul</span>',
    'sol': 'Utilize a cor <span style="color: yellow;">amarela</span>',
  };

  let currentPhase = 0;
  let selectedColor = 0x000000;
  let drawing = false;
  let points: { x: number, y: number }[] = [];
  let currentImage: Phaser.GameObjects.Image;
  let graphics: Phaser.GameObjects.Graphics;
  let isDrawingEnabled = true;

  // Adicione ouvintes de evento para os tamanhos
  document.getElementById('sizeSmall')?.addEventListener('click', () => {
    brushSize = 5;
  });

  document.getElementById('sizeMedium')?.addEventListener('click', () => {
    brushSize = 10;
  });

  document.getElementById('sizeLarge')?.addEventListener('click', () => {
    brushSize = 15;
  });

  document.getElementById('sizeExtraLarge')?.addEventListener('click', () => {
    brushSize = 25;
  });

  const nextPhase = () => {
    points = [];
    const phase: keyof typeof phaseColors = phases[currentPhase];
    const correctColor = phaseColors[phase];

    const phaseText = document.getElementById('currentPhase') as HTMLParagraphElement;
    phaseText.innerText = `FASE ${currentPhase + 1}`;

    const colorPhraseText = document.getElementById('color-phrase') as HTMLHeadingElement;
    colorPhraseText.innerHTML = colorPhrases[phase];

    if (currentImage) {
      currentImage.destroy();
    }

    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2;

    currentImage = this.add.image(centerX, centerY, phase).setScale(0.7);

    if (graphics) {
      graphics.clear();
    }
    graphics = this.add.graphics({ lineStyle: { width: brushSize, color: selectedColor } });

    this.input.on('pointerdown', () => {
      if (isDrawingEnabled) {
        drawing = true;
        points = [];
      }
    });

    this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
      if (drawing && isDrawingEnabled) {
        points.push({ x: pointer.x, y: pointer.y });
        graphics.clear();
        graphics.lineStyle(brushSize, selectedColor);
        graphics.beginPath();
        graphics.moveTo(points[0].x, points[0].y);
        points.forEach(point => graphics.lineTo(point.x, point.y));
        graphics.strokePath();
      }
    });

    this.input.on('pointerup', () => {
      drawing = false;
    });
  };

  const showResultModal = (correct: boolean) => {
    if (correct) {
      correctScore++;
    } else {
      wrongScore++;
    }

    currentPhase++;
    if (currentPhase >= phases.length) {
      showFinalResult();
    } else {
      nextPhase();
    }
  };

  const showFinalResult = () => {
    const result = {
      score: correctScore
    };

    localStorage.setItem('Cores-Acertos-Pais', JSON.stringify(result));

    window.location.href = '/Pais/jogos/figuras-coloridas/result';
  };

  const restartGame = () => {
    correctScore = 0;
    wrongScore = 0;
    currentPhase = 0;
    nextPhase();
  };

  this.cameras.main.setBackgroundColor('#FFFFFF');

  document.getElementById('redButton')?.addEventListener('click', () => {
    selectedColor = 0xff0000;
  });

  document.getElementById('blueButton')?.addEventListener('click', () => {
    selectedColor = 0x0000ff;
  });

  document.getElementById('yellowButton')?.addEventListener('click', () => {
    selectedColor = 0xffff00;
  });

  document.getElementById('brownButton')?.addEventListener('click', () => {
    selectedColor = 0x8b4513;
  });

  document.getElementById('sendButton')?.addEventListener('click', () => {
    const phase: keyof typeof phaseColors = phases[currentPhase];
    const correctColor = phaseColors[phase];

    console.log(`Cor selecionada: ${selectedColor.toString(16)}, Cor correta: ${correctColor.toString(16)}`);

    if (selectedColor === correctColor) {
      showResultModal(true);
    } else {
      showResultModal(false);
    }
  });

  nextPhase();
}

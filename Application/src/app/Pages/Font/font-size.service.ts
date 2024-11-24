import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FontSizeService {

  constructor() { }

  public baseFontSize: Map<string, number> = new Map();
  public fontSizeMultiplier: number = 1;

  initializeFontSize(elementId: string, initialSize: number): void {
    if (!this.baseFontSize.has(elementId)) {
      this.baseFontSize.set(elementId, initialSize);
    }
  }

  getFontSize(elementId: string): number {
    const initialSize = this.baseFontSize.get(elementId);
    if (initialSize === undefined) {
      throw new Error(`O tamanho da fonte do elemento '${elementId}' não foi encontrado!`)
    }
    return initialSize * this.fontSizeMultiplier;
  }

  increaseFontSize() {
    if (this.fontSizeMultiplier < 1.2) {
      this.fontSizeMultiplier += 0.1;
    }
  }

  decreaseFontSize() {
    if (this.fontSizeMultiplier > 1) {
      this.fontSizeMultiplier -= 0.1;
    }
  }
}
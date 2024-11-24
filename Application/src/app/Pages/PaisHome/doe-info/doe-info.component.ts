import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontSizeService } from '../../Font/font-size.service';
import { LanguageService } from '../../Language/language.service';

@Component({
  selector: 'app-doe-info',
  standalone: true,
  imports: [RouterLink, NgClass, NgIf],
  templateUrl: './doe-info.component.html',
  styleUrl: './doe-info.component.css'
})
export class DoeInfoComponent {
  Doe: string = '../../../assets/HomeImages/doeImg.png';

  //------------------------------------------------------------------------------------//

  constructor(public fontSizeService: FontSizeService, public languageService: LanguageService) {
    this.languageService.currentLanguage.subscribe(language => {
      this.currentLanguage = language;
    });
  }

  currentLanguage!: string;

  toggleLanguage() {
    const newLanguage = this.currentLanguage === 'pt' ? 'en' : 'pt';

    this.languageService.changeLanguage(newLanguage);
  }

  ngOnInit(): void {
    this.fontSizeService.initializeFontSize('txH1', 30);
    this.fontSizeService.initializeFontSize('txDoe', 20);
  }

  getFontSizeClass(): string {
    if (this.fontSizeService.fontSizeMultiplier > 1.2) {
      return 'size1_2';
    }
    return '';
  }

  aumentarFonte() {
    this.fontSizeService.increaseFontSize();
  }

  diminuirFonte() {
    this.fontSizeService.decreaseFontSize();
  }
}

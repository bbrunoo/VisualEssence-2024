import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontSizeService } from '../../../Font/font-size.service';
import { LanguageService } from '../../../Language/language.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  Insta: string = '../../../assets/HomeImages/instagram.png';
  X: string = '../../../assets/HomeImages/x.png';
  Face: string = '../../../assets/HomeImages/facebook.png';

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
    this.fontSizeService.initializeFontSize('txCont', 20);
    this.fontSizeService.initializeFontSize('txDir', 15);
  }

  aumentarFonte() {
    this.fontSizeService.increaseFontSize();
  }

  diminuirFonte() {
    this.fontSizeService.decreaseFontSize();
  }
}

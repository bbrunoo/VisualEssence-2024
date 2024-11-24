import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from "../Shared-Pais/header/header.component";
import { VlibrasComponent } from "../../vlibras/vlibras.component";
import { ChatBotIconeComponent } from "../../chat-bot-conteudo/chat-bot-icone/chat-bot-icone.component";
import { FontSizeService } from '../../Font/font-size.service';
import { NgClass, NgIf } from '@angular/common';
import { LanguageService } from '../../Language/language.service';

@Component({
  selector: 'app-jogos',
  standalone: true,
  imports: [RouterLink, HeaderComponent, VlibrasComponent, ChatBotIconeComponent, NgClass, NgIf],
  templateUrl: './jogos.component.html',
  styleUrl: './jogos.component.css'
})
export class JogosComponent {
  Dalt: string = '../../../assets/HomeImages/daltonismo.png';
  Miop: string = '../../../assets/HomeImages/miopia.png';

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
    this.fontSizeService.initializeFontSize('txH1', 25);
    this.fontSizeService.initializeFontSize('txJog', 20);
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

import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from "../Shared-Pais/header/header.component";
import { FontSizeService } from '../../Font/font-size.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-jogos',
  standalone: true,
  imports: [RouterLink, HeaderComponent, NgClass],
  templateUrl: './jogos.component.html',
  styleUrl: './jogos.component.css'
})
export class JogosComponent {
  Dalt: string = '../../../assets/HomeImages/daltonismo.png';
  Miop: string = '../../../assets/HomeImages/miopia.png';

  //------------------------------------------------------------------------------------//

  constructor(public fontSizeService: FontSizeService) { }

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

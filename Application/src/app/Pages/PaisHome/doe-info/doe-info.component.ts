import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontSizeService } from '../../Font/font-size.service';

@Component({
  selector: 'app-doe-info',
  standalone: true,
  imports: [RouterLink, NgClass],
  templateUrl: './doe-info.component.html',
  styleUrl: './doe-info.component.css'
})
export class DoeInfoComponent {
  Doe: string = '../../../assets/HomeImages/doeImg.png';

  //------------------------------------------------------------------------------------//

  constructor(public fontSizeService: FontSizeService) { }

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

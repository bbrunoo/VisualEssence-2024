import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontSizeService } from '../../../Font/font-size.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  Insta: string = '../../../assets/HomeImages/instagram.png';
  X: string = '../../../assets/HomeImages/x.png';
  Face: string = '../../../assets/HomeImages/facebook.png';

  constructor(public fontSizeService: FontSizeService) { }

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

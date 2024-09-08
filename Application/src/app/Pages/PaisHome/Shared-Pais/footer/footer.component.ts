import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

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
}

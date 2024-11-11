import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-doe-info',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './doe-info.component.html',
  styleUrl: './doe-info.component.css'
})
export class DoeInfoComponent {
  Doe: string = '../../../assets/HomeImages/doeImg.png';
}

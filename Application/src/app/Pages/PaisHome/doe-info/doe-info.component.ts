import { Component } from '@angular/core';

@Component({
  selector: 'app-doe-info',
  standalone: true,
  imports: [],
  templateUrl: './doe-info.component.html',
  styleUrl: './doe-info.component.css'
})
export class DoeInfoComponent {
  Doe: string = '../../../assets/HomeImages/doeImg.png';
}

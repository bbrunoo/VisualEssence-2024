import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-jogos',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './jogos.component.html',
  styleUrl: './jogos.component.css'
})
export class JogosComponent {
  Dalt: string = '../../../assets/HomeImages/daltonismo.png';
  Miop: string = '../../../assets/HomeImages/miopia.png';

}

import { Component } from '@angular/core';
import { HeaderComponent } from '../Shared-Pais/header/header.component';
import { LogoMenuComponent } from "../../SharedMenu/logo-menu/logo-menu.component";

@Component({
  selector: 'app-opcoes-miopia',
  standalone: true,
  imports: [LogoMenuComponent],
  templateUrl: './opcoes-miopia.component.html',
  styleUrl: './opcoes-miopia.component.css'
})
export class OpcoesMiopiaComponent {
  Dalt: string = '../../../assets/HomeImages/daltonismo.png';
  Miop: string = '../../../assets/HomeImages/miopia.png';

}

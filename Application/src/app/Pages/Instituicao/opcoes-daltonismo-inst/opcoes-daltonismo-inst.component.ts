import { Component } from '@angular/core';
import { LogoMenuInstComponent } from "../../SharedMenu/logo-menu-inst/logo-menu-inst.component";
import { InstMenuComponent } from "../shared-menu/inst-menu/inst-menu.component";

@Component({
  selector: 'app-opcoes-daltonismo-inst',
  standalone: true,
  imports: [LogoMenuInstComponent, InstMenuComponent],
  templateUrl: './opcoes-daltonismo-inst.component.html',
  styleUrl: './opcoes-daltonismo-inst.component.css'
})
export class OpcoesDaltonismoInstComponent {
  Dalt: string = '../../../assets/HomeImages/daltonismo.png';
  Miop: string = '../../../assets/HomeImages/miopia.png';

}

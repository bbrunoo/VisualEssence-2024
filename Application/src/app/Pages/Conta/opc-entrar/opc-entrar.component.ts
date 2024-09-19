import { VlibrasComponent } from './../../vlibras/vlibras.component';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LogoMenuComponent } from "../../SharedMenu/logo-menu/logo-menu.component";

@Component({
  selector: 'app-opc-entrar',
  standalone: true,
  imports: [VlibrasComponent, RouterLink, RouterLinkActive, LogoMenuComponent],
  templateUrl: './opc-entrar.component.html',
  styleUrl: './opc-entrar.component.css'
})
export class OpcEntrarComponent {
  imagemFundo: string = '../../../../assets/astroLog.png';
}

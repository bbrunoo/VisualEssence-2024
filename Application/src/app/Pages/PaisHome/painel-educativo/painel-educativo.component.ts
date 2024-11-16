import { LogoMenuComponent } from './../../SharedMenu/logo-menu/logo-menu.component';
import { FooterComponent } from './../Shared-Pais/footer/footer.component';
import { HeaderComponent } from './../Shared-Pais/header/header.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-painel-educativo',
  standalone: true,
  imports: [ FooterComponent, LogoMenuComponent],
  templateUrl: './painel-educativo.component.html',
  styleUrl: './painel-educativo.component.css'
})
export class PainelEducativoComponent {

}

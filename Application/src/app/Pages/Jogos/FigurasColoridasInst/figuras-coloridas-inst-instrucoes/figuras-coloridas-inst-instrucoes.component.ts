import { Component } from '@angular/core';
import { LogoMenuComponent } from '../../../SharedMenu/logo-menu/logo-menu.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-figuras-coloridas-inst-instrucoes',
  standalone: true,
  imports: [LogoMenuComponent, RouterLink],
  templateUrl: './figuras-coloridas-inst-instrucoes.component.html',
  styleUrl: './figuras-coloridas-inst-instrucoes.component.css'
})
export class FigurasColoridasInstInstrucoesComponent {

}

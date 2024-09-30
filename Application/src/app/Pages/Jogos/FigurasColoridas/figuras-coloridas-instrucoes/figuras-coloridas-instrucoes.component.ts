import { Component } from '@angular/core';
import { LogoMenuComponent } from '../../../SharedMenu/logo-menu/logo-menu.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-figuras-coloridas-instrucoes',
  standalone: true,
  imports: [LogoMenuComponent, RouterLink],
  templateUrl: './figuras-coloridas-instrucoes.component.html',
  styleUrl: './figuras-coloridas-instrucoes.component.css'
})
export class FigurasColoridasInstrucoesComponent {

}

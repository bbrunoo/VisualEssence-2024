import { Component } from '@angular/core';
import { LogoMenuComponent } from '../../../SharedMenu/logo-menu/logo-menu.component';
import { RouterLink } from '@angular/router';
import { LogoMenuInstComponent } from "../../../SharedMenu/logo-menu-inst/logo-menu-inst.component";

@Component({
  selector: 'app-figuras-coloridas-inst-instrucoes',
  standalone: true,
  imports: [LogoMenuComponent, RouterLink, LogoMenuInstComponent],
  templateUrl: './figuras-coloridas-inst-instrucoes.component.html',
  styleUrl: './figuras-coloridas-inst-instrucoes.component.css'
})
export class FigurasColoridasInstInstrucoesComponent {

}

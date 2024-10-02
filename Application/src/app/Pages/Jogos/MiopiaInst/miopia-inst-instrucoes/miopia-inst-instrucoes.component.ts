import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LogoMenuComponent } from '../../../SharedMenu/logo-menu/logo-menu.component';
import { LogoMenuInstComponent } from "../../../SharedMenu/logo-menu-inst/logo-menu-inst.component";

@Component({
  selector: 'app-miopia-inst-instrucoes',
  standalone: true,
  imports: [RouterLink, LogoMenuComponent, LogoMenuInstComponent],
  templateUrl: './miopia-inst-instrucoes.component.html',
  styleUrl: './miopia-inst-instrucoes.component.css'
})
export class MiopiaInstInstrucoesComponent {

}

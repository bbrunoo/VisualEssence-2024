import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LogoMenuComponent } from '../../../SharedMenu/logo-menu/logo-menu.component';

@Component({
  selector: 'app-miopia-inst-instrucoes',
  standalone: true,
  imports: [RouterLink, LogoMenuComponent],
  templateUrl: './miopia-inst-instrucoes.component.html',
  styleUrl: './miopia-inst-instrucoes.component.css'
})
export class MiopiaInstInstrucoesComponent {

}

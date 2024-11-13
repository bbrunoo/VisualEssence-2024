import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LogoMenuComponent } from '../../../SharedMenu/logo-menu/logo-menu.component';
import { LogoMenuInstComponent } from '../../../SharedMenu/logo-menu-inst/logo-menu-inst.component';

@Component({
  selector: 'app-miopia-letras-inst-instrucao',
  standalone: true,
  imports: [RouterLink, LogoMenuInstComponent],
  templateUrl: './miopia-letras-inst-instrucao.component.html',
  styleUrl: './miopia-letras-inst-instrucao.component.css'
})
export class MiopiaLetrasInstInstrucaoComponent {

}

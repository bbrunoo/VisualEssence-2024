import { Component } from '@angular/core';
import { LogoMenuInstComponent } from "../../../SharedMenu/logo-menu-inst/logo-menu-inst.component";
import { LogoMenuComponent } from "../../../SharedMenu/logo-menu/logo-menu.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-miopia-letras-pais-instrucao',
  standalone: true,
  imports: [LogoMenuInstComponent, LogoMenuComponent, RouterLink],
  templateUrl: './miopia-letras-pais-instrucao.component.html',
  styleUrl: './miopia-letras-pais-instrucao.component.css'
})
export class MiopiaLetrasPaisInstrucaoComponent {

}

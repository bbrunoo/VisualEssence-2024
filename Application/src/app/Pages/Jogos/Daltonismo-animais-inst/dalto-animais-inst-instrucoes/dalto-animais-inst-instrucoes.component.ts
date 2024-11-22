import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { InstMenuComponent } from "../../../Instituicao/shared-menu/inst-menu/inst-menu.component";
import { LogoMenuInstComponent } from "../../../SharedMenu/logo-menu-inst/logo-menu-inst.component";

@Component({
  selector: 'app-dalto-animais-inst-instrucoes',
  standalone: true,
  imports: [NgIf, LogoMenuInstComponent],
  templateUrl: './dalto-animais-inst-instrucoes.component.html',
  styleUrl: './dalto-animais-inst-instrucoes.component.css'
})
export class DaltoAnimaisInstInstrucoesComponent {
 isInstructions: boolean = true;

 constructor(private router: Router) {}

 nextPhase(): void {
   this.isInstructions = false;
 }

 previousPhase(): void {
   this.isInstructions = true;
 }

 goToNextScreen(): void {
   this.router.navigate(['/instituicao/jogos/daltonismo-animais']);
 }

 close(): void {
   console.log('Fechar a tela ou outra ação');
 }
}

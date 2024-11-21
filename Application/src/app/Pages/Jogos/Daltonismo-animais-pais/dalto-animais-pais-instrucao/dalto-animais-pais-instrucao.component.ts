import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LogoMenuComponent } from "../../../SharedMenu/logo-menu/logo-menu.component";

@Component({
  selector: 'app-dalto-animais-pais-instrucao',
  standalone: true,
  imports: [NgIf, LogoMenuComponent],
  templateUrl: './dalto-animais-pais-instrucao.component.html',
  styleUrl: './dalto-animais-pais-instrucao.component.css'
})
export class DaltoAnimaisPaisInstrucaoComponent {
  isInstructions: boolean = true;

  constructor(private router: Router) {}

  nextPhase(): void {
    this.isInstructions = false;
  }

  previousPhase(): void {
    this.isInstructions = true;
  }

  goToNextScreen(): void {
    this.router.navigate(['/Pais/jogos/daltonismo-animais']);
  }

  close(): void {
    console.log('Fechar a tela ou outra ação');
  }
}

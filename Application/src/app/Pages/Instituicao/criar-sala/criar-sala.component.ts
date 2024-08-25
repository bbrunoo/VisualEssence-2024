import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf, CommonModule } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';
//////import { CadCriOpComponent } from "../cad-cri-op/cad-cri-op.component";

@Component({
  selector: 'app-criar-sala',
  standalone: true,
  imports: [RouterLink, NgIf, CommonModule, CadCriOpComponent],
  templateUrl: './criar-sala.component.html',
  styleUrl: './criar-sala.component.css',
  animations: [
    trigger('fadeAnimation', [
      state('void', style({ opacity: 0 })),
      transition('void <=> *', [animate('500ms ease-in-out')]),
    ]),
  ],
})
export class CriarSalaComponent {
  user: any;
  Perfil: any;
  Logout: any;
  logout: any;

  //-------------------------------------------------------------------------------------------

  showCriarS = false;
  showOpCad = false;
  showCadUni = false;
  showCadMas = false;

  toggleCriarS() {
    this.showCriarS = !this.showCriarS;
  }

  toggleOpCad() {
    this.showOpCad = !this.showOpCad;
  }

  toggleCadUni() {
    this.showCadUni = !this.showCadUni;
  }

  toggleCadMas() {
    this.showCadMas = !this.showCadMas;
  }
}
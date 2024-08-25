import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf, CommonModule } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CadastUniComponent } from '../cadast-uni/cadast-uni.component';
import { CadastMassaComponent } from '../cadast-massa/cadast-massa.component';

@Component({
  selector: 'app-opc-cadast',
  standalone: true,
  imports: [RouterLink, NgIf, CommonModule, CadastUniComponent, CadastMassaComponent],
  templateUrl: './opc-cadast.component.html',
  styleUrl: './opc-cadast.component.css',
  animations: [
    trigger('fadeAnimation', [
      state('void', style({ opacity: 0 })),
      transition('void <=> *', [animate('500ms ease-in-out')]),
    ]),
  ],
})
export class OpcCadastComponent {
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

  showCadastro(type: string) {
    if (type === 'uni') {
      this.showCadUni = true;
      this.showCadMas = false;
    } else if (type === 'mas') {
      this.showCadUni = false;
      this.showCadMas = true;
    }
  }
}
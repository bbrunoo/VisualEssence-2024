import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { OpcCadastComponent } from '../opc-cadast/opc-cadast.component';

@Component({
  selector: 'app-cadast-uni',
  standalone: true,
  imports: [RouterLink, NgIf, CommonModule, FormsModule, OpcCadastComponent],
  templateUrl: './cadast-uni.component.html',
  styleUrl: './cadast-uni.component.css',
  animations: [
    trigger('fadeAnimation', [
      state('void', style({ opacity: 0 })),
      transition('void <=> *', [animate('500ms ease-in-out')]),
    ]),
  ],
})
export class CadastUniComponent {
  user: any;
  Perfil: any;
  Logout: any;
  logout: any;

  //-------------------------------------------------------------------------------------------

  showNew = false;

  toggleContent() {
    this.showNew = !this.showNew;
  }

  //-------------------------------------------------------------------------------------------

  selectSexo: string = '';
  selectSala: string = '';

  SelectChange(event: Event, type: string): void {
    const selectElement = event.target as HTMLSelectElement;

    if (type === 'sexo' && selectElement.value === 'bra' || selectElement.value === '') {
      this.selectSexo = '';
    } else if (type === 'sala' && selectElement.value === 'bra' || selectElement.value === '') {
      this.selectSala = '';
    }
  }
}
import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf, CommonModule } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FormsModule } from '@angular/forms';
import { InstMenuComponent } from '../shared-menu/inst-menu/inst-menu.component';

@Component({
  selector: 'app-cadast-massa',
  standalone: true,
  imports: [RouterLink, NgIf, CommonModule, FormsModule, InstMenuComponent],
  templateUrl: './cadast-massa.component.html',
  styleUrl: './cadast-massa.component.css',
  animations: [
    trigger('fadeAnimation', [
      state('void', style({ opacity: 0 })),
      transition('void <=> *', [animate('500ms ease-in-out')]),
    ]),
  ],
})
export class CadastMassaComponent {
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

  //--------------------------------------------------------------------------------------------------

  @ViewChild('inputFile', { static: false })
  inputFile!: ElementRef<HTMLInputElement>;
  fileName: string | null = null;

  fileUpl(): void {
    this.inputFile.nativeElement.click();
  }

  fileSel(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.fileName = file.name;
      console.log('Arquivo Selecionado:', file);
    }
  }
}

import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf, CommonModule } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FormsModule } from '@angular/forms';
import { InstMenuComponent } from '../shared-menu/inst-menu/inst-menu.component';
import { VlibrasComponent } from '../../vlibras/vlibras.component';
import Swal from 'sweetalert2';
import { FontSizeService } from '../../Font/font-size.service';

@Component({
  selector: 'app-cadast-massa',
  standalone: true,
  imports: [RouterLink, NgIf, CommonModule, FormsModule, InstMenuComponent, VlibrasComponent],
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

  /*--------------------------------------------------------------------------------------------------*/

  selectSala: string = '';

  SelectChange(event: Event, type: string): void {
    const selectElement = event.target as HTMLSelectElement;

    if (type === 'sala' && selectElement.value === 'bra' || selectElement.value === '') {
      this.selectSala = '';
    }
  }

  /*--------------------------------------------------------------------------------------------------*/

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
      const allowedTypes = ['application/pdf', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];

      if (allowedTypes.includes(file.type)) {
        this.fileName = file.name;
        console.log('Arquivo Selecionado:', file);
      } else {
        Swal.fire({
          title: "Tipo de Arquivo Inválido!",
          text: "Por favor, selecione um PDF ou um arquivo Excel.",
          imageUrl: '../../../../assets/icons/cancel.png',
          imageWidth: 100,
          imageHeight: 100,
          confirmButtonText: 'OK',
          confirmButtonColor: '#ff3c3c',
          heightAuto: false
        });
      }
    }
  }

  /*--------------------------------------------------------------------------------------------------*/
  constructor(public fontSizeService: FontSizeService) { }

  ngOnInit(): void {
    this.fontSizeService.initializeFontSize('txLB', 18);
    this.fontSizeService.initializeFontSize('txSA', 17);
  }

  getFontSizeClass(): string {
    if (this.fontSizeService.fontSizeMultiplier > 1.2) {
      return 'size1_2';
    }
    return '';
  }
}

import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgIf, CommonModule, NgClass } from '@angular/common';
import { InstMenuComponent } from '../../shared-menu/inst-menu/inst-menu.component';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-home-game-section',
  standalone: true,
  imports: [InstMenuComponent, NgClass,NgIf, CommonModule, FormsModule, RouterLink],
  templateUrl: './home-game-section.component.html',
  styleUrl: './home-game-section.component.css'
})
export class HomeGameSectionComponent {
  Dalt: string = '../../../assets/HomeImages/daltonismo.png';
  Miop: string = '../../../assets/HomeImages/miopia.png';

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

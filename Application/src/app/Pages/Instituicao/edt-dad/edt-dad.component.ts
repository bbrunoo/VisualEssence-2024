import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edt-dad',
  standalone: true,
  imports: [RouterLink, NgIf, FormsModule],
  templateUrl: './edt-dad.component.html',
  styleUrl: './edt-dad.component.css'
})
export class EdtDadComponent {
  user: any;
  Perfil: any;
  Logout: any;
  logout: any;

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
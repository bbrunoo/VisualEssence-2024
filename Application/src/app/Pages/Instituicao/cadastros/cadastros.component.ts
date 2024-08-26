import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf, CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastros',
  standalone: true,
  imports: [RouterLink, NgIf, CommonModule],
  templateUrl: './cadastros.component.html',
  styleUrl: './cadastros.component.css'
})
export class CadastrosComponent {
  user: any;
  Perfil: any;
  Logout: any;
  logout: any;

  //-------------------------------------------------------------------------------------------

  imgSRC: string | ArrayBuffer | null = null;

  fileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.imgSRC = reader.result;
      };

      reader.readAsDataURL(file);
    }
  }
}
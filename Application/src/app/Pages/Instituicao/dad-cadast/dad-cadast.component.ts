import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-dad-cadast',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './dad-cadast.component.html',
  styleUrl: './dad-cadast.component.css'
})
export class DadCadastComponent {
  Perfil: any;
  user: any;
  Logout: any;
  logout: any;
}
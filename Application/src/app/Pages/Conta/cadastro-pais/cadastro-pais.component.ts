import { Component} from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../../Services/Auth/AuthService/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { UserPais } from '../../../Models/UserPais.model';


@Component({
  selector: 'app-cadastro-pais',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FormsModule, CommonModule],
  templateUrl: './cadastro-pais.component.html',
  styleUrl: './cadastro-pais.component.css',
  providers: [AuthService],
})

export class CadastroPaisComponent {
  confirmarSenha: string = '';

  showPassword1: boolean = false;
  showPassword2: boolean = false;

  toggleShowPassword() {
    this.showPassword1 = !this.showPassword1;
  }
  toggleShowPasswordConfirm() {
    this.showPassword2 = !this.showPassword2;
  }

  UserPais = new UserPais('', '', '');
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) { }

  register() {
    this.authService.registerPais(this.UserPais).subscribe({
      next: (response) => {
        console.log('Registrado com sucesso', response);
        this.router.navigate(['/login-pais']);
      },
      error: (error) => {
        console.log('Não foi possível realizar o cadastro', error);
      }
    });
  }
}


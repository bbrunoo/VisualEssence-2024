import { Component} from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../../Services/Auth/AuthService/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { UserPais } from '../../../Models/UserPais.model';
import Swal from 'sweetalert2';

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
        Swal.fire({
          title: 'Sucesso!',
          text: 'Registro realizado com sucesso.',
          imageUrl: '../../../../assets/icons/check.png',
          imageWidth: 100,
          imageHeight: 100,
          confirmButtonText: 'OK',
          confirmButtonColor: '#3085d6',
          heightAuto: false
        }).then(() => {
          this.router.navigate(['/login-pais']);
        });
      },
      error: (error) => {
        Swal.fire({
          title: 'Erro',
          text: 'Não foi possível realizar o cadastro.',
          imageUrl: '../../../../assets/icons/cancel.png',
          imageWidth: 100,
          imageHeight: 100,
          confirmButtonText: 'OK',
          confirmButtonColor: '#3085d6',
          heightAuto: false
        });
      }
    });
  }
}


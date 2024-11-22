import { VlibrasComponent } from './../../vlibras/vlibras.component';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../../Services/Auth/AuthService/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserPais } from '../../../Models/UserPais.model';
import Swal from 'sweetalert2';
import { LogoMenuComponent } from "../../SharedMenu/logo-menu/logo-menu.component";

@Component({
  selector: 'app-cadastro-pais',
  standalone: true,
  imports: [ RouterLink, RouterLinkActive, FormsModule, CommonModule, LogoMenuComponent],
  templateUrl: './cadastro-pais.component.html',
  styleUrl: './cadastro-pais.component.css',
  providers: [AuthService],
})

export class CadastroPaisComponent {
  confirmarSenha: string = '';
  showPassword1: boolean = false;
  showPassword2: boolean = false;
  UserPais = new UserPais('', '', '');
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) { }

  toggleShowPassword() {
    this.showPassword1 = !this.showPassword1;
  }

  toggleShowPasswordConfirm() {
    this.showPassword2 = !this.showPassword2;
  }

  register() {
    if (!this.UserPais.nome || !this.UserPais.email || !this.UserPais.senha || !this.confirmarSenha) {
      this.errorMessage = 'Por favor, preencha todos os campos.';
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.UserPais.email)) {
      this.errorMessage = 'O formato do email é inválido.';
      return;
    }

    if (this.UserPais.senha !== this.confirmarSenha) {
      this.errorMessage = 'As senhas não coincidem.';
      return;
    }

    if (this.UserPais.senha.length < 8) {
      this.errorMessage = 'A senha deve ter pelo menos 8 caracteres.';
      return;
    }

    this.errorMessage = null;

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
          customClass: {
            title: 'custom-swal-title',
            htmlContainer: 'custom-swal-text',
          },
        }).then(() => {
          this.router.navigate(['/login-pais']);
        });
      },
      error: (error) => {
        const errorMessage = error.error || 'Ocorreu um erro ao tentar realizar o cadastro. Tente novamente.';
        Swal.fire({
          title: 'Erro',
          text: errorMessage,
          imageUrl: '../../../../assets/icons/cancel.png',
          imageWidth: 100,
          imageHeight: 100,
          confirmButtonText: 'OK',
          confirmButtonColor: '#3085d6',
          customClass: {
            title: 'custom-swal-title',
            htmlContainer: 'custom-swal-text',
          },
        });
      },
    });
  }
}

import { VlibrasComponent } from './../../vlibras/vlibras.component';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../Services/Auth/AuthService/auth.service';
import { CredentialsPais } from '../../../Models/credentialsPais.model';
import { LogoMenuComponent } from "../../SharedMenu/logo-menu/logo-menu.component";
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login-pais',
  standalone: true,
  imports: [VlibrasComponent, RouterLink, RouterLinkActive, FormsModule, LogoMenuComponent, NgIf],
  templateUrl: './login-pais.component.html',
  styleUrl: './login-pais.component.css',
  providers: [AuthService],
})
export class LoginPaisComponent {
  showPassword: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = '';

  CredentialsPais: CredentialsPais = { email: '', senha: '' };

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    if (!this.CredentialsPais.email || !this.CredentialsPais.senha) {
      this.errorMessage = 'Por favor, preencha todos os campos.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.loginPais(this.CredentialsPais).subscribe(
      (response) => {
        this.isLoading = false;
        console.log('Logado com sucesso', response);
        this.router.navigate(['/Pais/Home']);
      },
      (error) => {
        this.isLoading = false;

        if (error.status === 400) {
          this.errorMessage = 'Usuário não existe.';
        } else if (error.status === 401) {
          this.errorMessage = 'Usuário ou senha inválido.';
        } else {
          this.errorMessage = 'Ocorreu um erro ao tentar realizar o login. Tente novamente mais tarde.';
        }

        console.log('Erro ao fazer login', error);
      }
    );
  }
}

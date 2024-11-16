import { VlibrasComponent } from './../../vlibras/vlibras.component';
import { CredentialsInst } from '../../../Models/credentialsInst.model';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../Services/Auth/AuthService/auth.service';
import { LogoMenuComponent } from "../../SharedMenu/logo-menu/logo-menu.component";
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login-inst',
  standalone: true,
  imports: [VlibrasComponent, RouterLink, RouterLinkActive, FormsModule, LogoMenuComponent, NgIf],
  templateUrl: './login-inst.component.html',
  styleUrl: './login-inst.component.css',
  providers: [AuthService],
})

export class LoginInstComponent {
  showPassword: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = '';

  CredentialsInst: CredentialsInst = { emailInst: '', senha: '' };

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    // Verifica se os campos estão preenchidos corretamente
    if (!this.CredentialsInst.emailInst || !this.CredentialsInst.senha) {
      this.errorMessage = 'Por favor, preencha todos os campos.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = ''; // Reseta mensagem de erro antes do envio

    this.authService.loginInst(this.CredentialsInst).subscribe(
      (response) => {
        this.isLoading = false;
        console.log('Logado com sucesso', response);
        this.router.navigate(['/instituicao/home']);
      },
      (error) => {
        this.isLoading = false;

        // Define mensagem de erro baseada no status HTTP retornado
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

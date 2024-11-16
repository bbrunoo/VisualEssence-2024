import { VlibrasComponent } from './../../vlibras/vlibras.component';
import { CredentialsInst } from './../../../Models/credentialsInst.model';
import { UserInst } from './../../../Models/UserInst.Model';
import { Component, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../../Services/Auth/AuthService/auth.service';
import { NgForm, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { NgxMaskDirective } from 'ngx-mask';
import { NgxMaskPipe } from 'ngx-mask';
import Swal from 'sweetalert2';
import { LogoMenuComponent } from "../../SharedMenu/logo-menu/logo-menu.component";

@Component({
  selector: 'app-cadastro-inst',
  standalone: true,
  imports: [VlibrasComponent, RouterLink, RouterLinkActive, FormsModule, CommonModule, HttpClientModule, NgxMaskDirective, NgxMaskPipe, ReactiveFormsModule, LogoMenuComponent],
  templateUrl: './cadastro-inst.component.html',
  styleUrl: './cadastro-inst.component.css',
  providers: [AuthService],
})

export class CadastroInstComponent {
  confirmarSenha: string = '';
  showPassword1: boolean = false;
  showPassword2: boolean = false;
  errorMessage: string = '';
  UserInst = new UserInst('', '', '', '');

  constructor(private authService: AuthService, private router: Router) { }

  // Função para mostrar ou esconder as senhas
  toggleShowPassword() {
    this.showPassword1 = !this.showPassword1;
  }

  toggleShowPasswordConfirm() {
    this.showPassword2 = !this.showPassword2;
  }

  // Função de registro
  register(cadastroForm: NgForm) {
    // Verificação de campos obrigatórios e valores válidos
    if (!this.UserInst.nomeInst || !this.UserInst.email || !this.UserInst.senha || !this.confirmarSenha || !this.UserInst.cnpj) {
      this.errorMessage = 'Todos os campos são obrigatórios.';
      return;
    }

    if (this.UserInst.email.includes(' ') || this.UserInst.senha.includes(' ') || this.UserInst.cnpj.includes(' ')) {
      this.errorMessage = 'O email, CNPJ e senha não podem conter espaços em branco.';
      return;
    }

    // Validar o comprimento da senha (mínimo 8 caracteres)
    if (this.UserInst.senha.length < 8) {
      this.errorMessage = 'A senha deve ter pelo menos 8 caracteres.';
      return;
    }

    // Validar se as senhas coincidem
    if (this.confirmarSenha !== this.UserInst.senha) {
      this.errorMessage = 'As senhas não coincidem.';
      return;
    }

    // Limpar mensagem de erro se não houver problemas
    this.errorMessage = '';

    // Chamada ao serviço de registro
    this.authService.registerInst(this.UserInst).subscribe({
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
          this.router.navigate(['/login-inst']);
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

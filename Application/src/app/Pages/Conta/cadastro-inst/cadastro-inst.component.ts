import { VlibrasComponent } from './../../vlibras/vlibras.component';
import { UserInst } from './../../../Models/UserInst.Model';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../../Services/Auth/AuthService/auth.service';
import { NgForm, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxMaskDirective } from 'ngx-mask';
import Swal from 'sweetalert2';
import { LogoMenuComponent } from "../../SharedMenu/logo-menu/logo-menu.component";

@Component({
  selector: 'app-cadastro-inst',
  standalone: true,
  imports: [VlibrasComponent, RouterLink, RouterLinkActive, FormsModule, CommonModule, HttpClientModule, NgxMaskDirective, ReactiveFormsModule, LogoMenuComponent],
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

  toggleShowPassword() {
    this.showPassword1 = !this.showPassword1;
  }

  toggleShowPasswordConfirm() {
    this.showPassword2 = !this.showPassword2;
  }

  register(cadastroForm: NgForm) {
    if (!this.UserInst.nomeInst || !this.UserInst.email || !this.UserInst.senha || !this.confirmarSenha || !this.UserInst.cnpj) {
      this.errorMessage = 'Todos os campos são obrigatórios.';
      return;
    }

    if (this.UserInst.email.includes(' ') || this.UserInst.senha.includes(' ') || this.UserInst.cnpj.includes(' ')) {
      this.errorMessage = 'O email, CNPJ e senha não podem conter espaços em branco.';
      return;
    }

    if (this.UserInst.senha.length < 8) {
      this.errorMessage = 'A senha deve ter pelo menos 8 caracteres.';
      return;
    }

    if (this.confirmarSenha !== this.UserInst.senha) {
      this.errorMessage = 'As senhas não coincidem.';
      return;
    }

    this.errorMessage = '';

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
          customClass: {
            title: 'custom-swal-title',
            htmlContainer: 'custom-swal-text',
          },
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
          customClass: {
            title: 'custom-swal-title',
            htmlContainer: 'custom-swal-text',
          },
          confirmButtonColor: '#3085d6',
          heightAuto: false
        });
      }
    });
  }
}

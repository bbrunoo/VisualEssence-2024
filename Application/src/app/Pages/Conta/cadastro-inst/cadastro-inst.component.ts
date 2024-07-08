import { CredentialsInst } from './../../../Models/credentialsInst.model';
import { UserInst } from './../../../Models/UserInst.Model';
import { Component, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../../Services/Auth/AuthService/auth.service';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { NgxMaskDirective } from 'ngx-mask';
import { NgxMaskPipe } from 'ngx-mask';

@Component({
  selector: 'app-cadastro-inst',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FormsModule, CommonModule, HttpClientModule, NgxMaskDirective, NgxMaskPipe],
  templateUrl: './cadastro-inst.component.html',
  styleUrl: './cadastro-inst.component.css',
  providers: [AuthService],
})

export class CadastroInstComponent {
  confirmarSenha: string = '';

  showPassword1: boolean = false;
  showPassword2: boolean = false;

  toggleShowPassword() {
    this.showPassword1 = !this.showPassword1;
  }
  toggleShowPasswordConfirm() {
    this.showPassword2 = !this.showPassword2;
  }

  errorMessage: string ='';

  UserInst = new UserInst('', '', '', '');

  constructor(private authService: AuthService, private router: Router) { }

  register() {
    if (this.confirmarSenha == this.UserInst.senha) {

      console.log('Tentando fazer cadastrar com as credenciais:', this.UserInst);
      this.authService.registerInst(this.UserInst).subscribe({
        next: (response) => {
          console.log('Registrado com sucesso', response);
          this.router.navigate(['/login-inst']);
        },
        error: (error) => {
          console.log('Não foi possível realizar o cadastro', error);
        }
      });
    }
    else {
      this.errorMessage = 'As senhas não coincidem';
    }
  }
}

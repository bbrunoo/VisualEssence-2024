import { VlibrasComponent } from './../../vlibras/vlibras.component';
import { CredentialsInst } from '../../../Models/credentialsInst.model';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../Services/Auth/AuthService/auth.service';
import { LogoMenuComponent } from "../../SharedMenu/logo-menu/logo-menu.component";

@Component({
  selector: 'app-login-inst',
  standalone: true,
  imports: [VlibrasComponent, RouterLink, RouterLinkActive, FormsModule, LogoMenuComponent],
  templateUrl: './login-inst.component.html',
  styleUrl: './login-inst.component.css',
  providers: [AuthService],
})

export class LoginInstComponent {
  showPassword: boolean = false;

  CredentialsInst: CredentialsInst = {emailInst: '', senha: ''};


  toggleShowPassword() {
    this.showPassword =!this.showPassword;
  }

  constructor(private authService: AuthService, private router: Router) { }

  login(){
    console.log('Tentando fazer login com as credenciais:', this.CredentialsInst);
    this.authService.loginInst(this.CredentialsInst).subscribe(
      (response) => {
      console.log('Logado com sucesso', response);
      this.router.navigate(['/instituicao/home']);
    }, error => {
      console.log('Não foi possivel realizar o login', error);
    });
  }
  }

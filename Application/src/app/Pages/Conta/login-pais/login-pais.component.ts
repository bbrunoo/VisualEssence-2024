import { VlibrasComponent } from './../../vlibras/vlibras.component';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../Services/Auth/AuthService/auth.service';
import { CredentialsPais } from '../../../Models/credentialsPais.model';
import { LogoMenuComponent } from "../../SharedMenu/logo-menu/logo-menu.component";

@Component({
  selector: 'app-login-pais',
  standalone: true,
  imports: [VlibrasComponent, RouterLink, RouterLinkActive, FormsModule, LogoMenuComponent],
  templateUrl: './login-pais.component.html',
  styleUrl: './login-pais.component.css',
  providers: [AuthService],

})
export class LoginPaisComponent {

  showPassword: boolean = false;

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  CredentialsPais: CredentialsPais = {email: '', senha: ''};

  constructor(private authService: AuthService, private router: Router) { }

  login(){
    this.authService.loginPais(this.CredentialsPais).subscribe(
      (response) => {
      console.log('Logado com sucesso', response);
      this.router.navigate(['/Pais/Home']);
    }, error => {
      console.log('Não foi possivel realizar o login', error);
    });
  }
}


import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../../Services/Auth/AuthService/auth.service';
import { loggedUser } from '../../../../Models/LoggedUser/user.model';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-back-header',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './back-header.component.html',
  styleUrl: './back-header.component.css'
})
export class BackHeaderComponent implements OnInit {

  user: loggedUser = {id: '', nome:'', email: '', isInstitucional: false, isPais: false}

  constructor(private userService: AuthService){}
  ngOnInit(): void {
    this.userService.getUserProfile().subscribe(
      (data) => {
        this.user = data;
        console.log('dados do usuario', this.user);
      },
      (error) =>
      {
        console.log('Erro ao recuperar dados do usuario', error);
      }
    )
  }

  logout() {
    localStorage.removeItem('token');
  }

  Logo: string = 'assets/HomeImages/VisualEssenceLogo.svg';
  Logout: string = 'assets/HomeImages/logout.png';
  Perfil: string = 'assets/HomeImages/miopia.png';

  scrollTo(section: string) {
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  }
}

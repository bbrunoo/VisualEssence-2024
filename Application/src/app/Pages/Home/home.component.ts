import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../Services/Auth/AuthService/auth.service';
import { loggedUser } from '../../Models/LoggedUser/user.model';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {

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
  Nave: string = 'assets/HomeImages/nave.png';
  Doe: string = 'assets/HomeImages/doeImg.png';
  Dalt: string = 'assets/HomeImages/daltonismo.png';
  Miop: string = 'assets/HomeImages/miopia.png';

  Insta: string = 'assets/HomeImages/instagram.png';
  X: string = 'assets/HomeImages/x.png';
  Face: string = 'assets/HomeImages/facebook.png';
}

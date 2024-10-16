import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { loggedUser } from '../../../../Models/LoggedUser/user.model';
import { AuthService } from '../../../../../Services/Auth/AuthService/auth.service';

@Component({
  selector: 'app-inst-menu',
  standalone: true,
  imports: [NgIf, RouterLink],
  exportAs: 'inst-menu',
  templateUrl: './inst-menu.component.html',
  styleUrl: './inst-menu.component.css'
})
export class InstMenuComponent implements OnInit{
  user: loggedUser = {id: '', nome:'', email: '', isInstitucional: false, isPais: false}

  constructor(private userService: AuthService){}
  ngOnInit(): void {
    this.getUser();
  }

  getUser(){
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

  Logout: string = 'assets/HomeImages/logout.png';
  Perfil: string = 'assets/HomeImages/miopia.png';
}

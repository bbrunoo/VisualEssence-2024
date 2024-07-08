import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { JwtDecoderService } from '../../../Services/Jwt-decoder/jwt-decoder.service';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from '../../../Services/Auth/AuthService/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent{
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

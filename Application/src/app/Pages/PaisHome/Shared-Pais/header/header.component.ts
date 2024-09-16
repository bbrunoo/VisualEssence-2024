import { Component, OnInit, HostListener, ViewChild} from '@angular/core';
import { AuthService } from '../../../../../Services/Auth/AuthService/auth.service';
import { loggedUser } from '../../../../Models/LoggedUser/user.model';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NgIf, MatSidenavModule, MatListModule, MatToolbarModule, MatIconModule, MatMenuModule, MatButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

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

  @ViewChild('sidenav') sidenav!: MatSidenav; // Asserção não nula

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target && !target.closest('.mat-sidenav') && !target.closest('.profile-img')) {
      this.closeSidenav();
    }
  }

  openSidenav() {
    this.sidenav.open();
    document.querySelector('.sidenav')?.classList.add('open');
  }

  closeSidenav() {
    this.sidenav.close();
    document.querySelector('.sidenav')?.classList.remove('open');
  }
}

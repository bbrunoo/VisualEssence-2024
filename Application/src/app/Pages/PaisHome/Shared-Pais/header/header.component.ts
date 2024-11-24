import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
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
import { PaisProfileComponent } from '../../../Shared-Profile/pais-profile/pais-profile.component';
import { MatDialog } from '@angular/material/dialog';
import { UserPais } from '../../../../Models/User/GetUserPais.model';
import { AccountPictureService } from '../../../Instituicao/Services/profile-picture-service/account-picture.service';
import { UserInfosService } from '../../../Instituicao/Services/user-infos/user-infos.service';
import { FontSizeService } from '../../../Font/font-size.service';
import { LanguageService } from '../../../Language/language.service';

declare var google: any;

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NgIf, MatSidenavModule, MatListModule, MatToolbarModule, MatIconModule, MatMenuModule, MatButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  user: loggedUser = { id: '', nome: '', email: '', isInstitucional: false, isPais: false }
  userInfo: UserPais | null = null;
  userId = String(this.userService.getUserIdFromToken());

  constructor(private userService: AuthService, private dialog: MatDialog, private accountPicture: AccountPictureService, private userInfoService: UserInfosService, public fontSizeService: FontSizeService, public languageService: LanguageService) {
    this.languageService.currentLanguage.subscribe(language => {
      this.currentLanguage = language;
    });
  }

  currentLanguage!: string;

  toggleLanguage() {
    const newLanguage = this.currentLanguage === 'pt' ? 'en' : 'pt';

    this.languageService.changeLanguage(newLanguage);
  }

  ngOnInit(): void {
    this.getUserInfos(this.userId);

    this.fontSizeService.initializeFontSize('txMenu', 17);
  }

  getUserInfos(userId: string): void {
    this.userInfoService.getUserInfoPaisById(userId).subscribe(
      (response) => {
        console.log("User info:", response);
        this.userInfo = response;
        this.loadImage();
      },
      (error) => {
        console.log("Erro ao obter informações do usuário:", error);
      }
    );
  }

  openSideModal(userInstId: string) {
    this.dialog.open(PaisProfileComponent, {
      width: '250px',
      hasBackdrop: false,
      position: { top: '0', right: '0' },
      data: { userId: userInstId }
    });
  }


  loadImage(): void {
    this.accountPicture.getFotoPais(this.userId).subscribe(
      (response) => {
        console.log('Resposta da imagem:', response);
        if (response && response.url) {
          this.userInfo!.foto = response.url;
        } else {
          this.userInfo!.foto = '../../../../../assets/user.png';
        }
      },
      (error) => {
        console.log('Erro ao carregar a foto do usuário:', error);
        if (this.userInfo) {
          this.userInfo.foto = '../../../../../assets/user.png';
        }
      }
    );
  }

  logout() {
    localStorage.removeItem('token');
  }

  Logo: string = 'assets/HomeImages/VisualEssenceLogo.svg';
  Logout: string = 'assets/HomeImages/logout.png';

  scrollTo(section: string) {
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  }

  aumentarFonte() {
    this.fontSizeService.increaseFontSize();
  }

  diminuirFonte() {
    this.fontSizeService.decreaseFontSize();
  }
}

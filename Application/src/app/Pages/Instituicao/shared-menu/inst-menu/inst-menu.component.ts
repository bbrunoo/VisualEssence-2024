import { RouterLink } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { loggedUser } from '../../../../Models/LoggedUser/user.model';
import { AuthService } from '../../../../../Services/Auth/AuthService/auth.service';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { MatDialog } from '@angular/material/dialog';
import { InstProfileComponent } from '../../../Shared-Profile/inst-profile/inst-profile.component';
import { UserInst } from '../../../../Models/User/GetUserInst.model';
import { AccountPictureService } from '../../Services/profile-picture-service/account-picture.service';
import { UserInfosService } from '../../Services/user-infos/user-infos.service';
import { FontSizeService } from '../../../Font/font-size.service';

@Component({
  selector: 'app-inst-menu',
  standalone: true,
  imports: [
    NgIf,
    RouterLink,
    NgClass
  ],
  exportAs: 'inst-menu',
  templateUrl: './inst-menu.component.html',
  styleUrl: './inst-menu.component.css',
})
export class InstMenuComponent implements OnInit {
  user: loggedUser = {
    id: '',
    nome: '',
    email: '',
    isInstitucional: false,
    isPais: false,
  };
  userInfo: UserInst | null = null;
  userId = String(this.authService.getUserIdFromToken());


  constructor(
    private dialog: MatDialog,
    private accountPicture: AccountPictureService,
    private authService: AuthService,
    private userInfoService: UserInfosService,
    public fontSizeService: FontSizeService,
  ) { }

  ngOnInit(): void {
    this.getUserInfos(this.userId);

    this.fontSizeService.initializeFontSize('txMenu', 15);
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  Logout: string = 'assets/HomeImages/logout.png';

  openSideModal(userInstId: string): void {
    this.dialog.open(InstProfileComponent, {
      width: '250px',
      hasBackdrop: false,
      position: { top: '0', right: '0' },
      data: { userId: userInstId },
    });
  }

  getUserInfos(userId: string): void {
    this.userInfoService.getUserInfoById(userId).subscribe(
      (response) => {
        this.userInfo = response;
        this.loadImage();
      },
      (error) => console.error('Erro ao obter informações do usuário:', error)
    );
  }

  loadImage(): void {
    this.accountPicture.getFoto(this.userId).subscribe(
      (response) => {
        this.userInfo!.foto = response?.url || '../../../../../assets/user.png';
      },
      (error) => {
        console.error('Erro ao carregar a foto do usuário:', error);
        this.userInfo!.foto = '../../../../../assets/user.png';
      }
    );
  }

  getFontSizeClass(): string {
    if (this.fontSizeService.fontSizeMultiplier > 1.2) {
      return 'size1_2';
    }
    return '';
  }

  aumentarFonte() {
    this.fontSizeService.increaseFontSize();
  }

  diminuirFonte() {
    this.fontSizeService.decreaseFontSize();
  }
}

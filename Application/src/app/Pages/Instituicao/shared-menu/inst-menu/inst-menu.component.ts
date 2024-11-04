import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import {
  Component,
  Inject,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { loggedUser } from '../../../../Models/LoggedUser/user.model';
import { AuthService } from '../../../../../Services/Auth/AuthService/auth.service';
import {
  MatSidenav,
  MatSidenavContainer,
  MatSidenavContent,
} from '@angular/material/sidenav';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { InstProfileComponent } from '../../../Shared-Profile/inst-profile/inst-profile.component';
import { UserInst } from '../../../../Models/User/GetUserInst.model';
import { AccountPictureService } from '../../Services/profile-picture-service/account-picture.service';
import { UserInfosService } from '../../Services/user-infos/user-infos.service';

@Component({
  selector: 'app-inst-menu',
  standalone: true,
  imports: [
    NgIf,
    RouterLink,
    MatSidenav,
    MatSidenavContainer,
    MatSidenavContent,
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
    private userInfoService: UserInfosService
  ) {}

  ngOnInit(): void {
    this.getUserInfos(this.userId);
  }

  logout() {
    localStorage.removeItem('token');
  }

  Logout: string = 'assets/HomeImages/logout.png';

  openSideModal(userInstId: string) {
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
        console.log('User info:', response);
        this.userInfo = response;
        this.loadImage();
      },
      (error) => {
        console.log('Erro ao obter informações do usuário:', error);
      }
    );
  }

  loadImage(): void {
    this.accountPicture.getFoto(this.userId).subscribe(
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
}

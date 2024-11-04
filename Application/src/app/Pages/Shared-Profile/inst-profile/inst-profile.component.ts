import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { RouterLink } from '@angular/router';
import { UserInst } from '../../../Models/User/GetUserInst.model';
import { UserInfosService } from '../../Instituicao/Services/user-infos/user-infos.service';
import { AccountPictureService } from '../../Instituicao/Services/profile-picture-service/account-picture.service';
import { NgFor } from '@angular/common';
import { ProfileUploadImageComponent } from '../../Instituicao/profile-upload-image/profile-upload-image.component';

@Component({
  selector: 'app-inst-profile',
  standalone: true,
  imports: [MatSidenav, MatSidenavContainer, MatSidenavContent, RouterLink, NgFor],
  templateUrl: './inst-profile.component.html',
  styleUrl: './inst-profile.component.css'
})
export class InstProfileComponent implements OnInit {
  userId: string;
  user: UserInst | null = null;
  imgSRC: string | ArrayBuffer | null = null;
  imagens: { [key: string]: string } = {};

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { userId: string },
    public dialogRef: MatDialogRef<InstProfileComponent>,
    private userInfo: UserInfosService,
    private accountPicture: AccountPictureService,
    private dialog: MatDialog
  ) {
    this.userId = data.userId;
  }

  ngOnInit(): void {
    console.log("userid modal", this.userId);
    this.getUserInfos(this.userId);
    this.loadImage();
  }

  closeModal() {
    this.dialogRef.close();
  }

  logout() {
    localStorage.removeItem('token');
    this.closeModal();
  }

  getUserInfos(userId: string): void {
    this.userInfo.getUserInfoById(userId).subscribe(
      (response) => {
        console.log("User info:", response);
        this.user = response;
        this.loadImage();
      },
      (error) => {
        console.log("Erro ao obter informações do usuário:", error);
      }
    );
  }

  loadImage(): void {
    this.accountPicture.getFoto(this.userId).subscribe(
      (response) => {
        console.log('Resposta da imagem:', response);
        if (response && response.url) {
          this.user!.foto = response.url;
        } else {
          this.user!.foto = '../../../../assets/user.png';
        }
      },
      (error) => {
        console.log('Erro ao carregar a foto do usuário:', error);
        if (this.user) {
          this.user.foto = '../../../../assets/user.png';
        }
      }
    );
  }

  fileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.imgSRC = reader.result;
      };

      reader.readAsDataURL(file);
    }
  }

  openImageUploadModal(userId = this.userId): void {
    const imageUrl = this.imagens[userId] || '../../../assets/user.png';
    const dialogRef = this.dialog.open(ProfileUploadImageComponent, {
      data: { id: userId, imageUrl: imageUrl },
      panelClass: 'custom-modal',
      width: '600px',

    });

    console.log(`Abrindo modal para a criança com ID: ${userId} e URL da imagem: ${imageUrl}`);

    dialogRef.afterClosed().subscribe((result) => {
    });
  }

}

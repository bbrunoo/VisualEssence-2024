import { UserPais } from './../../../Models/User/GetUserPais.model';
import { Component, Inject } from '@angular/core';
import { PaisProfileUploadPictureComponent } from '../../PaisHome/pais-profile-upload-picture/pais-profile-upload-picture.component';
import { AccountPictureService } from '../../Instituicao/Services/profile-picture-service/account-picture.service';
import { UserInfosService } from '../../Instituicao/Services/user-infos/user-infos.service';
import { InstProfileComponent } from '../inst-profile/inst-profile.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pais-profile',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './pais-profile.component.html',
  styleUrl: './pais-profile.component.css'
})
export class PaisProfileComponent {
  userId: string;
  user: UserPais | null = null;
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

  getUserInfos(userId: string): void {
    this.userInfo.getUserInfoPaisById(userId).subscribe(
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

  logout() {
    localStorage.removeItem('token');
    this.closeModal();
  }

  loadImage(): void {
    this.accountPicture.getFotoPais(this.userId).subscribe(
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
    const dialogRef = this.dialog.open(PaisProfileUploadPictureComponent, {
      data: { id: userId, imageUrl: imageUrl },
      panelClass: 'custom-modal',
      width: '600px',

    });

    console.log(`Abrindo modal para a criança com ID: ${userId} e URL da imagem: ${imageUrl}`);

    dialogRef.afterClosed().subscribe((result) => {
    });
  }

}

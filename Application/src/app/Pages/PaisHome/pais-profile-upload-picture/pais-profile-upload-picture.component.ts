import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProfileUploadImageComponent } from '../../Instituicao/profile-upload-image/profile-upload-image.component';
import { AccountPictureService } from '../../Instituicao/Services/profile-picture-service/account-picture.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-pais-profile-upload-picture',
  standalone: true,
  imports: [NgIf],
  templateUrl: './pais-profile-upload-picture.component.html',
  styleUrl: './pais-profile-upload-picture.component.css'
})
export class PaisProfileUploadPictureComponent {
  selectedFile: File | null = null;
  imageUrl: string | null = null;

  constructor(
    public dialogRef: MatDialogRef<ProfileUploadImageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: string },
    private instPicture: AccountPictureService
  ) {}

  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.selectedFile = target.files[0];
      this.imageUrl = URL.createObjectURL(this.selectedFile);
    }
  }

  onConfirm(): void {
    console.log('Método onConfirm chamado');

    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      this.instPicture.uploadFilePais(this.data.id, formData).subscribe(
        response => {
          console.log('Upload da imagem foi bem-sucedido:', response);
          this.dialogRef.close();
          window.location.reload();
        },
        error => {
          console.error('Erro ao fazer upload da imagem:', error);
        }
      );
    } else {
      console.warn('Nenhuma imagem foi selecionada para o upload.');
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}

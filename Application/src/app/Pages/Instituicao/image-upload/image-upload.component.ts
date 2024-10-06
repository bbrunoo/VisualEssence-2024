import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { PictureService } from '../Services/picture-service/picture.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-image-upload',
  standalone: true,
  imports: [MatDialogModule, NgIf],
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent {
  selectedFile: File | null = null;
  imageUrl: string | null = null;

  constructor(
    public dialogRef: MatDialogRef<ImageUploadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: string },
    private pictureService: PictureService
  ) {}

  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.selectedFile = target.files[0];
      this.imageUrl = URL.createObjectURL(this.selectedFile);
    }
  }

  onConfirm(): void {
    console.log('Método onConfirm chamado'); // Adicione esta linha para verificar se o método é chamado

    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      this.pictureService.uploadFile(this.data.id, formData).subscribe(
        response => {
          console.log('Upload da imagem foi bem-sucedido:', response);
          this.dialogRef.close();
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

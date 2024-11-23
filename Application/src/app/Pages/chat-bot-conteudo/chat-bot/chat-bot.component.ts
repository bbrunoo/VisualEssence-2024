import { detalhes } from './../../../Models/detalhes.model';
import { CommonModule } from '@angular/common';
import { AfterViewChecked, ChangeDetectorRef, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ChatbotService } from '../../../../Services/ChatBot/chatbot.service';
import { ChatbotResponse } from '../../../Models/chatbot.model';
import { AuthService } from '../../../../Services/Auth/AuthService/auth.service';
import { AccountPictureService } from '../../Instituicao/Services/profile-picture-service/account-picture.service';
import { UserPais } from '../../../Models/User/GetUserPais.model';
import { PictureService } from '../../Instituicao/Services/picture-service/picture.service';

@Component({
  selector: 'app-chat-bot',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.css'],
})
export class ChatBotComponent implements AfterViewChecked, OnInit {
  userMessage = '';
  messages = [
    { type: 'mensagEt', text: 'Olá Humano, meu nome é Eddy, qual seria sua dúvida?' },
  ];
  detalhes: detalhes[]=[];
  userInfo: UserPais | null = null;
  userId = String(this.userService.getUserIdFromToken());

  @ViewChild('messageContainer') private messageContainer!: ElementRef;

  constructor(
    public chatService: ChatbotService,
    private userService: AuthService,
    private accountPicture: AccountPictureService,
    public dialogRef: MatDialogRef<ChatBotComponent>,
    public pictureService: AccountPictureService,
    private cdr: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.loadImages();
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      const messageContainer = this.messageContainer.nativeElement;
      messageContainer.scrollTop = messageContainer.scrollHeight;
    } catch (err) {
      console.error('Erro ao rolar para baixo:', err);
    }
  }

  loadImages(): void {
    this.detalhes.forEach((user) => {
      console.log(`Carregando foto para usuário com ID: ${this.userId}`);

      this.pictureService.getFoto(this.userId).subscribe(
        (response) => {
          if (response && response.url) {
            user.foto = response.url;
            console.log(`Foto carregada com sucesso (Inst) para ID: ${this.userId}`);
          } else {
            console.warn(`Foto não encontrada no endpoint (Inst) para ID: ${this.userId}. Tentando no endpoint (Pais)...`);

            this.pictureService.getFotoPais(this.userId).subscribe(
              (responsePais) => {
                if (responsePais && responsePais.url) {
                  user.foto = responsePais.url;
                  console.log(`Foto carregada com sucesso (Pais) para ID: ${this.userId}`);
                } else {
                  user.foto = '../../../assets/user.png';
                  console.warn(`Foto não encontrada no endpoint (Pais) para ID: ${this.userId}. Usando imagem padrão.`);
                }
              },
              (errorPais) => {
                console.error(`Erro ao carregar foto no endpoint (Pais) para ID: ${this.userId}:`, errorPais);
                user.foto = '../../../assets/user.png';
              }
            );
          }
        },
        (error) => {
          console.error(`Erro ao carregar foto no endpoint (Inst) para ID: ${this.userId}:`, error);

          this.pictureService.getFotoPais(this.userId).subscribe(
            (responsePais) => {
              if (responsePais && responsePais.url) {
                user.foto = responsePais.url;
                console.log(`Foto carregada com sucesso (Pais) para ID: ${this.userId}`);
              } else {
                user.foto = '../../../assets/user.png';
                console.warn(`Foto não encontrada no endpoint (Pais) para ID: ${this.userId}. Usando imagem padrão.`);
              }
            },
            (errorPais) => {
              console.error(`Erro ao carregar foto no endpoint (Pais) para ID: ${this.userId}:`, errorPais);
              user.foto = '../../../assets/user.png'; 
            }
          );
        }
      );
    });
  }


  onImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = '../../../../../assets/user.png';
    console.error('Erro ao carregar a imagem, usando imagem padrão.');
  }

  sendMessage(event: Event): void {
    event.preventDefault();

    const pergunta = this.userMessage.trim();
    if (pergunta) {
      this.messages.push({ type: 'mensagUser', text: pergunta });
      this.userMessage = '';

      this.chatService.fazerPergunta(pergunta).subscribe({
        next: (resposta: ChatbotResponse) => {
          this.messages.push({ type: 'mensagEt', text: resposta.resposta });
        },
        error: (error) => {
          console.error('Erro ao consultar a API:', error);
          this.messages.push({ type: 'mensagEt', text: 'Desculpe, ocorreu um erro ao processar sua pergunta.' });
        }
      });
    }
  }

  closeDialog(): void {
    this.dialogRef.close({ messages: this.messages });
  }
}

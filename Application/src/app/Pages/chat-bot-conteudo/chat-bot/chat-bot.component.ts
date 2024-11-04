import { CommonModule } from '@angular/common';
import { AfterViewChecked, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ChatbotService } from '../../../../Services/ChatBot/chatbot.service';
import { ChatbotResponse } from '../../../Models/chatbot.model';
import { AuthService } from '../../../../Services/Auth/AuthService/auth.service';
import { AccountPictureService } from '../../Instituicao/Services/profile-picture-service/account-picture.service';
import { UserPais } from '../../../Models/User/GetUserPais.model';

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

  userInfo: UserPais | null = null;
  userId = String(this.userService.getUserIdFromToken());

  @ViewChild('messageContainer') private messageContainer!: ElementRef;

  constructor(
    public chatService: ChatbotService,
    private userService: AuthService,
    private accountPicture: AccountPictureService,
    public dialogRef: MatDialogRef<ChatBotComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
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

import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ChatBotComponent } from '../chat-bot/chat-bot.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-chat-bot-icone',
  standalone: true,
  imports: [MatDialogModule, NgIf],
  templateUrl: './chat-bot-icone.component.html',
  styleUrls: ['./chat-bot-icone.component.css']
})

export class ChatBotIconeComponent {
  isModalOpen = false;
  constructor(private dialog: MatDialog) { }

  openChat(): void {
    this.isModalOpen = true;
    console.log('Abrindo o modal...');

    const dialogRef = this.dialog.open(ChatBotComponent, {
      panelClass: 'custom-dialog-container',
      data: { messages: [] }
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.isModalOpen = false;
      if (result && result.messages) {
        console.log('Mensagens após fechar o modal:', result.messages);
      }
    });
  }

}

import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgIf, CommonModule, NgClass } from '@angular/common';
import { InstMenuComponent } from '../../shared-menu/inst-menu/inst-menu.component';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ChatBotIconeComponent } from "../../../chat-bot-conteudo/chat-bot-icone/chat-bot-icone.component";
import { VlibrasComponent } from "../../../vlibras/vlibras.component";
@Component({
  selector: 'app-home-game-section',
  standalone: true,
  imports: [InstMenuComponent, CommonModule, FormsModule, RouterLink, ChatBotIconeComponent, VlibrasComponent],
  templateUrl: './home-game-section.component.html',
  styleUrl: './home-game-section.component.css'
})
export class HomeGameSectionComponent {
  Dalt: string = '../../../assets/HomeImages/daltonismo.png';
  Miop: string = '../../../assets/HomeImages/miopia.png';

  showNew = false;

  toggleContent() {
    this.showNew = !this.showNew;
  }


}

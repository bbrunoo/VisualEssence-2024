import { Component } from '@angular/core';
import { HeaderComponent } from '../Shared-Pais/header/header.component';
import { LogoMenuComponent } from "../../SharedMenu/logo-menu/logo-menu.component";
import { RouterLink } from '@angular/router';
import { VlibrasComponent } from "../../vlibras/vlibras.component";
import { ChatBotIconeComponent } from "../../chat-bot-conteudo/chat-bot-icone/chat-bot-icone.component";

@Component({
  selector: 'app-opcoes-daltonismo',
  standalone: true,
  imports: [LogoMenuComponent, RouterLink, VlibrasComponent, ChatBotIconeComponent],
  templateUrl: './opcoes-daltonismo.component.html',
  styleUrl: './opcoes-daltonismo.component.css'
})
export class OpcoesDaltonismoComponent {
  Dalt: string = '../../../assets/HomeImages/daltonismo.png';
  Miop: string = '../../../assets/HomeImages/miopia.png';

}

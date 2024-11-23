import { Component } from '@angular/core';
import { LogoMenuComponent } from "../../SharedMenu/logo-menu/logo-menu.component";
import { RouterLink } from '@angular/router';
import { VlibrasComponent } from "../../vlibras/vlibras.component";
import { ChatBotIconeComponent } from '../../chat-bot-conteudo/chat-bot-icone/chat-bot-icone.component';

@Component({
  selector: 'app-opcoes-miopia',
  standalone: true,
  imports: [LogoMenuComponent, RouterLink, VlibrasComponent, ChatBotIconeComponent],
  templateUrl: './opcoes-miopia.component.html',
  styleUrl: './opcoes-miopia.component.css'
})
export class OpcoesMiopiaComponent {
  Dalt: string = '../../../assets/HomeImages/daltonismo.png';
  Miop: string = '../../../assets/HomeImages/miopia.png';

}

import { LogoMenuComponent } from './../../SharedMenu/logo-menu/logo-menu.component';
import { FooterComponent } from './../Shared-Pais/footer/footer.component';
import { HeaderComponent } from './../Shared-Pais/header/header.component';
import { Component } from '@angular/core';
import { VlibrasComponent } from "../../vlibras/vlibras.component";
import { ChatBotComponent } from "../../chat-bot-conteudo/chat-bot/chat-bot.component";
import { ChatBotIconeComponent } from "../../chat-bot-conteudo/chat-bot-icone/chat-bot-icone.component";

@Component({
  selector: 'app-painel-educativo',
  standalone: true,
  imports: [FooterComponent, LogoMenuComponent, VlibrasComponent, ChatBotIconeComponent],
  templateUrl: './painel-educativo.component.html',
  styleUrl: './painel-educativo.component.css'
})
export class PainelEducativoComponent {

}

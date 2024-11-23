import { Component } from '@angular/core';
import { LogoMenuInstComponent } from "../../SharedMenu/logo-menu-inst/logo-menu-inst.component";
import { RouterLink } from '@angular/router';
import { InstMenuComponent } from "../shared-menu/inst-menu/inst-menu.component";
import { VlibrasComponent } from "../../vlibras/vlibras.component";
import { ChatBotIconeComponent } from "../../chat-bot-conteudo/chat-bot-icone/chat-bot-icone.component";

@Component({
  selector: 'app-opcoes-miopia-inst',
  standalone: true,
  imports: [RouterLink, InstMenuComponent, VlibrasComponent, ChatBotIconeComponent],
  templateUrl: './opcoes-miopia-inst.component.html',
  styleUrl: './opcoes-miopia-inst.component.css'
})
export class OpcoesMiopiaInstComponent {
  Dalt: string = '../../../assets/HomeImages/daltonismo.png';
  Miop: string = '../../../assets/HomeImages/miopia.png';
}

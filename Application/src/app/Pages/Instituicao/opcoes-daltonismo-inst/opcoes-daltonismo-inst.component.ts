import { Component } from '@angular/core';
import { LogoMenuInstComponent } from "../../SharedMenu/logo-menu-inst/logo-menu-inst.component";
import { InstMenuComponent } from "../shared-menu/inst-menu/inst-menu.component";
import { RouterLink } from '@angular/router';
import { VlibrasComponent } from "../../vlibras/vlibras.component";
import { ChatBotIconeComponent } from "../../chat-bot-conteudo/chat-bot-icone/chat-bot-icone.component";
import { FontSizeService } from '../../Font/font-size.service';

@Component({
  selector: 'app-opcoes-daltonismo-inst',
  standalone: true,
  imports: [InstMenuComponent, RouterLink, VlibrasComponent, ChatBotIconeComponent],
  templateUrl: './opcoes-daltonismo-inst.component.html',
  styleUrl: './opcoes-daltonismo-inst.component.css'
})
export class OpcoesDaltonismoInstComponent {
  constructor(public fontSizeService: FontSizeService) { }

  ngOnInit(): void {
    this.fontSizeService.initializeFontSize('txH1', 20);
    this.fontSizeService.initializeFontSize('txp', 13);
    this.fontSizeService.initializeFontSize('txH2', 17);
    this.fontSizeService.initializeFontSize('txEx', 15);
  }
}

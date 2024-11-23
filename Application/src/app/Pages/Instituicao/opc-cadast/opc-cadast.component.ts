import { VlibrasComponent } from './../../vlibras/vlibras.component';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf, CommonModule } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CadastUniComponent } from '../cadast-uni/cadast-uni.component';
import { CadastMassaComponent } from '../cadast-massa/cadast-massa.component';
import { InstMenuComponent } from "../shared-menu/inst-menu/inst-menu.component";
import { ChatBotIconeComponent } from "../../chat-bot-conteudo/chat-bot-icone/chat-bot-icone.component";

@Component({
  selector: 'app-opc-cadast',
  standalone: true,
  imports: [VlibrasComponent, RouterLink, NgIf, CommonModule, ChatBotIconeComponent],
  templateUrl: './opc-cadast.component.html',
  styleUrl: './opc-cadast.component.css',
  animations: [
    trigger('fadeAnimation', [
      state('void', style({ opacity: 0 })),
      transition('void <=> *', [animate('500ms ease-in-out')]),
    ]),
  ],
})
export class OpcCadastComponent {

  showCriarS = false;
  showOpCad = false;
  showCadUni = false;
  showCadMas = false;

  toggleCriarS() {
    this.showCriarS = !this.showCriarS;
  }

  toggleOpCad() {
    this.showOpCad = !this.showOpCad;
  }

}

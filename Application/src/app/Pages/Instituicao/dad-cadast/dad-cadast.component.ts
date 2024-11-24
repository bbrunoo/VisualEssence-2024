import { VlibrasComponent } from './../../vlibras/vlibras.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { InstMenuComponent } from "../shared-menu/inst-menu/inst-menu.component";
import { CadastroUnicoService } from '../Services/cadastrounico/cadastro-unico.service';
import { GetCriancas } from '../../../Models/InstituicaoModels/GetCriancas.model';
import { ChatBotIconeComponent } from '../../chat-bot-conteudo/chat-bot-icone/chat-bot-icone.component';
import { FontSizeService } from '../../Font/font-size.service';

@Component({
  selector: 'app-dad-cadast',
  standalone: true,
  imports: [VlibrasComponent, InstMenuComponent, ChatBotIconeComponent],
  templateUrl: './dad-cadast.component.html',
  styleUrl: './dad-cadast.component.css'
})
export class DadCadastComponent implements OnInit {
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.criancaId = id;
      this.loadCriancaData();
    } else {
      console.error('ID não encontrado na rota');
    }

    this.fontSizeService.initializeFontSize('txH2', 18);
    this.fontSizeService.initializeFontSize('txTit', 17);
    this.fontSizeService.initializeFontSize('txL', 16);
  }
  constructor(private criancaService: CadastroUnicoService, private route: ActivatedRoute, public fontSizeService: FontSizeService) { }

  criancaId!: string;
  crianca!: GetCriancas;
  dadosCriancas: GetCriancas[] = [];
  loadCriancaData(): void {
    this.criancaService.getById(this.criancaId).subscribe(
      (c: GetCriancas) => {
        console.log("Criança carregada:", c);
        this.crianca = c;
      },
      error => {
        console.error('Erro ao carregar criança:', error);
      }
    );
  }
}

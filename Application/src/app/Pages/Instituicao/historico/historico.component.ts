import { Historico } from './../../../Models/historico.model';
import { AuthService } from './../../../../Services/Auth/AuthService/auth.service';
import { VlibrasComponent } from './../../vlibras/vlibras.component';
import { Component, OnInit } from '@angular/core';
import { InstMenuComponent } from "../shared-menu/inst-menu/inst-menu.component";
import { Router, RouterLink } from '@angular/router';
import { HistoricoService } from '../Services/historico-service/historico.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { SalasService } from '../Services/salas/salas.service';
import { GetSala } from '../../../Models/InstituicaoModels/GetSala.model';
import { CadastroUnicoService } from '../Services/cadastrounico/cadastro-unico.service';
import { PictureService } from '../Services/picture-service/picture.service';
import { GetCriancas } from '../../../Models/InstituicaoModels/GetCriancas.model';
import { CriancaComJogosDTO, HistoricoJogadasDTO } from '../../../Models/HistoricoJogadas.model';
import { ChatBotIconeComponent } from '../../chat-bot-conteudo/chat-bot-icone/chat-bot-icone.component';
import { FontSizeService } from '../../Font/font-size.service';

@Component({
  selector: 'app-historico',
  standalone: true,
  imports: [
    VlibrasComponent,
    NgIf,
    CommonModule,
    InstMenuComponent,
    NgFor,
    FormsModule,
    ReactiveFormsModule,
    ChatBotIconeComponent

  ],
  templateUrl: './historico.component.html',
  styleUrl: './historico.component.css'
})
export class HistoricoComponent implements OnInit {
  historico: CriancaComJogosDTO[] = [];
  nomeJogo: string = '';
  nomeCrianca: string = '';
  pageNumber: number = 1;
  pageSize: number = 10;
  userInstId: string = String(this.authService.getUserIdFromToken());
  salas: GetSala[] = [];
  idsala?: string;
  DataJogo: string = "";

  constructor(
    private historicoService: HistoricoService,
    private salasService: SalasService,
    private authService: AuthService,
    private pictureService: PictureService,
    private router: Router,
    public fontSizeService: FontSizeService
  ) { }

  ngOnInit(): void {
    this.getUltimosDoisJogos();

    this.fontSizeService.initializeFontSize('txL', 18);
    this.fontSizeService.initializeFontSize('txInp', 16);
    this.fontSizeService.initializeFontSize('txSJ', 15);
    this.fontSizeService.initializeFontSize('txpN', 20);
    this.fontSizeService.initializeFontSize('txpU', 13);
    this.fontSizeService.initializeFontSize('txDo', 10);
  }

  verDetalhes(id: string): void {
    this.router.navigate(['/instituicao/detalhes', id]);
  }

  onSearch() {
    console.log('onSearch chamado');
    console.log('nomeJogo:', this.nomeJogo, 'nomeCrianca:', this.nomeCrianca);
    this.pageNumber = 1;
    this.getUltimosDoisJogos();
    this.clearFilters();
  }

  getUltimosDoisJogos() {
    console.log('getUltimosDoisJogos chamado');
    this.historicoService.getUltimosDoisJogosPorCrianca(this.nomeJogo, this.nomeCrianca, this.pageNumber, this.pageSize)
      .subscribe(
        response => {
          console.log('Resposta da API:', response);
          this.historico = response.items;
          this.totalPages = response.totalPages;
        },
        error => {
          console.error('Erro ao carregar os últimos dois jogos por criança!', error);
        }
      );
  }

  loadSalas(): void {
    this.salasService.getSalaByUserId(this.userInstId).subscribe({
      next: (response) => {
        this.salas = response;
      },
      error: (err) => {
        console.error('Não foi possível carregar as salas!', err);
      },
    });
  }

  loadImages(): void {
    this.historico.forEach((crianca) => {
      this.pictureService.getFoto(crianca.idCrianca).subscribe(
        (response) => {
          console.log('Resposta da imagem:', response);
          if (response && response.url) {
            crianca.foto = response.url;
          } else {
            crianca.foto = '../../../assets/user.png';
          }
        },
        (error) => {
          console.log('Erro ao carregar a foto da criança:', error);
          crianca.foto = '../../../assets/user.png';
        }
      );
    });
  }

  processarDataNascimento() {
    if (this.DataJogo) {
      const [dia, mes, ano] = this.DataJogo.split('-');
      const data = new Date(+ano, +mes - 1, +dia);
      console.log(data);
    }
  }

  clearFilters(): void {
    this.nomeJogo = '';
    this.nomeCrianca = '';
    this.pageNumber = 1;
    this.getUltimosDoisJogos();
  }

  totalPages: number = 10;

  onPageChange(event: string) {
    const newPageNumber = parseInt(event, 10);
    if (!isNaN(newPageNumber) && newPageNumber >= 1 && newPageNumber <= this.totalPages) {
      this.pageNumber = newPageNumber;
    } else {
      this.pageNumber = 1;
    }
    this.getUltimosDoisJogos();
  }

  goToFirstPage() {
    this.pageNumber = 1;
    this.getUltimosDoisJogos();
  }

  goToLastPage() {
    this.pageNumber = this.totalPages;
    this.getUltimosDoisJogos();
  }

  nextPage() {
    if (this.pageNumber < this.totalPages) {
      this.pageNumber++;
      this.getUltimosDoisJogos();
    }
  }

  prevPage() {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.getUltimosDoisJogos();
    }
  }

  validateInput(event: KeyboardEvent) {
    const allowedKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete'];
    if (allowedKeys.indexOf(event.key) !== -1) {
      return;
    }
    if (!/^[0-9]$/.test(event.key)) {
      event.preventDefault();
    }
  }
}

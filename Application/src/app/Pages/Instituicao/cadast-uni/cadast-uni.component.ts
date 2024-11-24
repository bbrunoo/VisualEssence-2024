import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgIf, CommonModule, NgClass } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { InstMenuComponent } from '../shared-menu/inst-menu/inst-menu.component';
import { SalasService } from '../Services/salas/salas.service';
import { CadastroUnicoService } from '../Services/cadastrounico/cadastro-unico.service';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { GetSala } from '../../../Models/InstituicaoModels/GetSala.model';
import Swal from 'sweetalert2';
import { AuthService } from '../../../../Services/Auth/AuthService/auth.service';
import { CriancaInstDTO } from '../../../Models/CriancaInstDTO.model';
import { VlibrasComponent } from '../../vlibras/vlibras.component';
import { ChatBotIconeComponent } from "../../chat-bot-conteudo/chat-bot-icone/chat-bot-icone.component";
import { FontSizeService } from '../../Font/font-size.service';
import { LanguageService } from '../../Language/language.service';

@Component({
  selector: 'app-cadast-uni',
  standalone: true,
  imports: [VlibrasComponent, RouterLink, NgIf, CommonModule, FormsModule, InstMenuComponent, NgxMaskDirective, ReactiveFormsModule, ChatBotIconeComponent, NgClass],
  templateUrl: './cadast-uni.component.html',
  styleUrl: './cadast-uni.component.css',
  animations: [
    trigger('fadeAnimation', [
      state('void', style({ opacity: 0 })),
      transition('void <=> *', [animate('500ms ease-in-out')]),
    ]),
  ],
})
export class CadastUniComponent implements OnInit {
  isSubmitting: boolean = false;

  constructor(
    private salaService: SalasService,
    private dadosC: CadastroUnicoService,
    private router: Router,
    private authService: AuthService,
    public fontSizeService: FontSizeService, 
    public languageService: LanguageService) {
    this.languageService.currentLanguage.subscribe(language => {
      this.currentLanguage = language;
    });
  }

  currentLanguage!: string;

  toggleLanguage() {
    const newLanguage = this.currentLanguage === 'pt' ? 'en' : 'pt';

    this.languageService.changeLanguage(newLanguage);
  }

  userInstId: string = String(this.authService.getUserIdFromToken());

  salas: GetSala[] = []
  ngOnInit() {
    this.salaService.getSalaByUserId(this.userInstId).subscribe(salas => {
      this.salas = salas;
    }, error => {
      console.error('Erro ao buscar salas:', error);
    });

    this.fontSizeService.initializeFontSize('tx7', 17);
    this.fontSizeService.initializeFontSize('tx6', 16);
  }

  dadosCriancas: CriancaInstDTO = {
    nome: '',
    sexo: '',
    nomeResp: '',
    cpf: '',
    endereco: '',
    cns: '',
    dataNascimento: '',
    rg: '',
    tel1: '',
    tel2: '',
    idSala: '',
    userInstId: '',
    sala: {
      id: '',
      nome: '',
      capacidade: 0,
      userInstId: ''
    }
  };

  sexos = [
    { valor: 'F', texto: 'Feminino' },
    { valor: 'M', texto: 'Masculino' }
  ];

  getSalas() {
    this.salaService.getSalaByUserId(this.userInstId).subscribe(
      response => {
        this.salas = response;
      },
      error => {
        console.error('Não foi possível carregar as salas!', error);
        throw error;
      }
    );
  }

  atualizarDadosSala(idSala: string) {
    this.salaService.getSalaByUserId(idSala).subscribe(
      sala => {
        this.dadosCriancas.sala = {
          id: sala.id,
          nome: sala.nome,
          capacidade: sala.capacidade,
          userInstId: sala.userInstId
        };
      },
      error => {
        console.error('Erro ao buscar os dados da sala:', error);
      }
    );
  }

  cadastrarCrianca() {
    if (this.dadosCriancas.idSala && this.userInstId) {
      if (this.isSubmitting) {
        return;
      }

      this.isSubmitting = true;

      const criancaDTO: CriancaInstDTO = {
        nome: this.dadosCriancas.nome,
        sexo: this.dadosCriancas.sexo,
        nomeResp: this.dadosCriancas.nomeResp,
        cpf: this.dadosCriancas.cpf,
        endereco: this.dadosCriancas.endereco,
        cns: this.dadosCriancas.cns,
        dataNascimento: this.dadosCriancas.dataNascimento,
        rg: this.dadosCriancas.rg,
        tel1: this.dadosCriancas.tel1,
        tel2: this.dadosCriancas.tel2,
        idSala: this.dadosCriancas.idSala,
        userInstId: this.userInstId
      };

      this.dadosC.cadastrarUnico(criancaDTO).subscribe({
        next: (response) => {
          Swal.fire({
            title: 'Sucesso!',
            text: 'Cadastrado com sucesso!',
            imageUrl: '../../../../assets/icons/check.png',
            imageWidth: 100,
            imageHeight: 100,
            confirmButtonText: 'OK',
            confirmButtonColor: '#3085d6',
            customClass: {
              title: 'custom-swal-title',
              htmlContainer: 'custom-swal-text',
            },
            heightAuto: false
          }).then(() => {
            this.changePage();
          });
        },
        error: (error) => {
          Swal.fire({
            title: 'Falha!',
            text: 'Erro ao cadastrar! Verifique a capacidade da sala!',
            imageUrl: '../../../../assets/icons/cancel.png',
            imageWidth: 100,
            imageHeight: 100,
            confirmButtonText: 'OK',
            confirmButtonColor: '#3085d6',
            customClass: {
              title: 'custom-swal-title',
              htmlContainer: 'custom-swal-text',
            },
            heightAuto: false
          });
        },
        complete: () => {
          this.isSubmitting = false;
        }
      });
    } else {
      Swal.fire({
        title: 'Erro!',
        text: 'Por favor, preencha todos os campos obrigatórios.',
        imageUrl: '../../../../assets/icons/cancel.png',
        imageWidth: 100,
        imageHeight: 100,
        customClass: {
          title: 'custom-swal-title',
          htmlContainer: 'custom-swal-text',
        },
        confirmButtonText: 'OK',
        confirmButtonColor: '#3085d6',
        heightAuto: false
      });
    }
  }

  changePage() {
    this.router.navigate(['/instituicao/cadastros']);
  }

  showNew = false;
  toggleContent() {
    this.showNew = !this.showNew;
  }

  getFontSizeClass(): string {
    if (this.fontSizeService.fontSizeMultiplier < 1.2 && this.fontSizeService.fontSizeMultiplier > 1) {
      return 'size1_1';
    } else if (this.fontSizeService.fontSizeMultiplier > 1) {
      return 'size1_2';
    }
    return '';
  }
}
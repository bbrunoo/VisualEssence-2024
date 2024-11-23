import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SalasService } from '../Services/salas/salas.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { CriancaSala } from '../../../Models/CriancaSala.model';
import { InstMenuComponent } from "../shared-menu/inst-menu/inst-menu.component";
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { PictureService } from '../Services/picture-service/picture.service';
import { VlibrasComponent } from "../../vlibras/vlibras.component";
import { ChatBotIconeComponent } from "../../chat-bot-conteudo/chat-bot-icone/chat-bot-icone.component";

@Component({
  selector: 'app-criancas-cadastradas-sala',
  standalone: true,
  imports: [NgFor, NgIf, InstMenuComponent, CommonModule, FormsModule, NgxMaskPipe, VlibrasComponent, ChatBotIconeComponent],
  templateUrl: './criancas-cadastradas-sala.component.html',
  styleUrl: './criancas-cadastradas-sala.component.css'
})
export class CriancasCadastradasSalaComponent {
  salaId: string | null = null;
  criancas: CriancaSala[] = [];

  constructor(private route: ActivatedRoute, private salasService: SalasService,
    private pictureService: PictureService,) {}

  ngOnInit(): void {
    this.salaId = this.route.snapshot.paramMap.get('id');
    if (this.salaId) {
      this.getCriancas(this.salaId);
    } else {
      console.error('Sala ID não encontrado');
    }
  }

  getCriancas(salaId: string) {
    this.salasService.getCriancasBySalaId(salaId).subscribe(
      (response) => {
        if (response && response.length > 0) {
          this.criancas = response;
          this.loadImages();
        } else {
          console.log('Nenhuma criança encontrada para essa sala');
        }
      },
      (error) => {
        console.error('Erro ao carregar as crianças!', error);
      }
    );
  }

  loadImages(): void {
    if (!this.criancas || this.criancas.length === 0) {
      console.warn('Nenhuma criança carregada para buscar imagens.');
      return;
    }

    this.criancas.forEach((crianca) => {
      this.pictureService.getFoto(crianca.id).subscribe(
        (response) => {
          if (response && response.url) {
            crianca.foto = response.url;
            console.log(`Imagem carregada para a criança com ID: ${crianca.id}`);
          } else {
            crianca.foto = '../../../assets/user.png';
            console.warn(`Imagem não encontrada para a criança com ID: ${crianca.id}. Usando imagem padrão.`);
          }
        },
        (error) => {
          console.error(`Erro ao carregar imagem para a criança com ID: ${crianca.id}. Detalhes:`, error);
          crianca.foto = '../../../assets/user.png';
        }
      );
    });
  }

  formatPhoneNumber(phone: string): string {
    if (!phone) return '';
    phone = phone.replace(/\D/g, '');
    return phone.replace(
      /(\d{2})(\d{5})(\d{4})/,
      '($1) $2-$3'
    );
  }

  getIdade(dataNascimento: string): number {
    const nascimento = new Date(dataNascimento);
    const hoje = new Date();
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const m = hoje.getMonth() - nascimento.getMonth();
    if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }
    return idade;
  }
}

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SalasService } from '../Services/salas/salas.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { CriancaSala } from '../../../Models/CriancaSala.model';
import { InstMenuComponent } from "../shared-menu/inst-menu/inst-menu.component";
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { PictureService } from '../Services/picture-service/picture.service';
import { FontSizeService } from '../../Font/font-size.service';

@Component({
  selector: 'app-criancas-cadastradas-sala',
  standalone: true,
  imports: [NgFor, NgIf, InstMenuComponent, CommonModule, FormsModule, NgxMaskPipe, NgxMaskDirective,],
  templateUrl: './criancas-cadastradas-sala.component.html',
  styleUrl: './criancas-cadastradas-sala.component.css'
})
export class CriancasCadastradasSalaComponent {
  salaId: string | null = null;
  criancas: CriancaSala[] = [];

  constructor(private route: ActivatedRoute, private salasService: SalasService,
    private pictureService: PictureService, public fontSizeService: FontSizeService) {}

  ngOnInit(): void {
    this.salaId = this.route.snapshot.paramMap.get('id');
    if (this.salaId) {
      this.getCriancas(this.salaId);
    } else {
      console.error('Sala ID não encontrado');
    }

    this.fontSizeService.initializeFontSize('txH3', 20);
    this.fontSizeService.initializeFontSize('txp', 16);
    this.fontSizeService.initializeFontSize('txND', 18);
  }

  getFontSizeClass(): string {
    if (this.fontSizeService.fontSizeMultiplier > 1.2) {
      return 'size1_2';
    }
    return '';
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
          crianca.foto = '../../../assets/user.png'; // Define imagem padrão em caso de erro
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

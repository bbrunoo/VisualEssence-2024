import { GetCriancas } from './../../../Models/InstituicaoModels/GetCriancas.model';
import { AuthService } from './../../../../Services/Auth/AuthService/auth.service';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf, CommonModule, NgFor } from '@angular/common';
import { InstMenuComponent } from '../shared-menu/inst-menu/inst-menu.component';
import { CadastroUnicoService } from '../Services/cadastrounico/cadastro-unico.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Sala } from '../../../Models/InstituicaoModels/Sala.model';
import { SalasService } from '../Services/salas/salas.service';
import { HeaderComponent } from '../../PaisHome/Shared-Pais/header/header.component';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { GetSala } from '../../../Models/InstituicaoModels/GetSala.model';
import { VlibrasComponent } from '../../vlibras/vlibras.component';
import { ImageUploadComponent } from '../image-upload/image-upload.component';
import { MatDialog } from '@angular/material/dialog';
import { PictureService } from '../Services/picture-service/picture.service';

@Component({
  selector: 'app-cadastros',
  standalone: true,
  imports: [
    VlibrasComponent,
    RouterLink,
    NgIf,
    CommonModule,
    InstMenuComponent,
    NgFor,
    FormsModule,
    HeaderComponent,
    NgxMaskPipe,
    NgxMaskDirective,
    ReactiveFormsModule,
  ],
  templateUrl: './cadastros.component.html',
  styleUrls: ['./cadastros.component.css'], // Corrigido o nome da propriedade para styleUrls
})
export class CadastrosComponent implements OnInit {
  imgSRC: string | ArrayBuffer | null = null;
  dadosCriancas: GetCriancas[] = [];
  salas: GetSala[] = [];
  idsala?: string;
  nomeCrianca?: string;
  codigo?: string;
  erroBusca: boolean = false;
  descricaoBusca: string = '';

  criancaId: string = '';
  imagens: { [key: string]: string } = {};
  userId = this.authService.getUserIdFromToken();

  constructor(
    private dados: CadastroUnicoService,
    private pictureService: PictureService,
    private salasService: SalasService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadSalas();
    this.searchCriancas();
    if (this.userId) {
      this.searchCriancas(); // Chama getCriancas com o userId
    } else {
      console.error('User ID não encontrado');
    }
    this.loadImages();
  }


  searchConsole(): void {
    console.log('Buscando crianças...');
    console.log(this.dadosCriancas);
    this.searchCriancas();
  }

  loadSalas(): void {
    this.salasService.getSalas().subscribe({
      next: (response) => {
        this.salas = response;
      },
      error: (err) => {
        console.error('Não foi possível carregar as salas!', err);
      },
    });
  }

  clearFilters(): void {
    this.idsala = undefined;
    this.codigo = '';
    this.nomeCrianca = '';
    this.searchCriancas();
  }

  getSalaNameById(salaId?: string): string {
    const sala = this.salas.find(s => s.id === salaId);
    return sala ? sala.nome : 'Sala não encontrada';
  }

  getSalaCapacidadeById(salaId?: string): string {
    const sala = this.salas.find(s => s.id === salaId);
    return sala ? sala.capacidade.toString() : 'Capacidade não encontrada'; // Garantindo que retorne uma string
  }

  searchCriancas(): void {
    const salaId = this.idsala !== undefined ? this.idsala : undefined;

    console.log('Nome enviado:', this.nomeCrianca);
    console.log('Sala enviada:', salaId);
    console.log('Código enviado:', this.codigo);

    this.dados.getCriancasByQuery(salaId, this.codigo, this.nomeCrianca)
      .subscribe(
        (data) => {
          this.dadosCriancas = data;
          this.erroBusca = data.length === 0;
          console.log('Crianças encontradasaaaaaaaa:', data);

          if (data.length > 0) {
            this.criancaId = data[0].id; // Atualiza com o ID da primeira criança encontrada
          }

          this.loadImages(); // Chama o método para carregar as imagens
        },
        (error) => {
          this.erroBusca = true;
          if (error.status === 404) {
            console.log('Nenhuma criança encontrada com os filtros aplicados.');
          } else {
            console.error('Erro ao buscar crianças:', error);
          }
        }
      );

    this.nomeCrianca = '';
    this.idsala = undefined;
    this.codigo = '';
  }

  loadImages(): void {
    this.dadosCriancas.forEach((crianca) => {
      this.pictureService.getFoto(crianca.id).subscribe(
        (response) => {
          console.log('Resposta da imagem:', response); // Verifique o que está sendo retornado
          if (response && response.foto) {
            crianca.imageUrl = response.foto; // Atribui a imagem retornada
          } else {
            crianca.imageUrl = '../../../assets/user.png'; // URL padrão
          }
        },
        (error) => {
          console.log('Erro ao carregar a foto da criança:', error);
          crianca.imageUrl = '../../../assets/user.png'; // URL padrão em caso de erro
        }
      );
    });
  }


  fileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.imgSRC = reader.result;
      };

      reader.readAsDataURL(file);
    }
  }

  openImageUploadModal(criancaId: string): void {
    const imageUrl = this.imagens[criancaId] || '../../../assets/user.png';
    const dialogRef = this.dialog.open(ImageUploadComponent, {
      data: { id: criancaId, imageUrl: imageUrl },
      panelClass: 'custom-modal',
      width: '600px',
    });

    console.log(`Abrindo modal para a criança com ID: ${criancaId} e URL da imagem: ${imageUrl}`);

    dialogRef.afterClosed().subscribe((result) => {
      // Lógica para tratar o resultado do modal, se necessário
    });
  }

  dataNascimento: string = "";

  processarDataNascimento() {
    if (this.dataNascimento) {
      const [dia, mes, ano] = this.dataNascimento.split('-');
      const data = new Date(+ano, +mes - 1, +dia);
      console.log(data);
    }
  }
}

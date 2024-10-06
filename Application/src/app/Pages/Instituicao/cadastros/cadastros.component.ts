import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf, CommonModule, NgFor } from '@angular/common';
import { InstMenuComponent } from '../shared-menu/inst-menu/inst-menu.component';
import { CadastroUnicoService } from '../Services/cadastrounico/cadastro-unico.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Sala } from '../../../Models/InstituicaoModels/Sala.model';
import { GetCriancas } from '../../../Models/InstituicaoModels/GetCriancas.model';
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
  imagens: { [key: string]: string } = {}; // Para armazenar as imagens como Base64

  constructor(
    private dados: CadastroUnicoService,
    private pictureService: PictureService,
    private salasService: SalasService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadSalas();
    this.searchCriancas();
    this.loadImages();
  }

  getCriancas(): void {
    this.dados.getCadastrados().subscribe({
      next: (response) => {
        this.dadosCriancas = response.map((crianca) => ({
          id: crianca.id,
          nome: crianca.nome,
          nomeResp: crianca.nomeResp,
          sexo: crianca.sexo,
          cpf: crianca.cpf,
          cns: crianca.cns,
          dataNascimento: crianca.dataNascimento,
          rg: crianca.rg,
          tel1: crianca.tel1,
          tel2: crianca.tel2,
          endereco: crianca.endereco,
          idSala: crianca.idSala,
          sala: {
            id: crianca.sala.id,
            nome: crianca.sala.nome,
            capacidade: crianca.sala.capacidade,
          },
          // A URL da imagem, com um fallback
          imageUrl: crianca.imageUrl || '../../../assets/user.png',
        }));

        // Se houver crianças carregadas, atualiza o criancaId para o primeiro da lista
        if (this.dadosCriancas.length > 0) {
          this.criancaId = this.dadosCriancas[0].id; // Atualiza com o ID da primeira criança
        }

        // Carregar imagens para cada criança
        // this.loadImages();

        console.log('Crianças carregadas com sucesso!', this.dadosCriancas);
      },
      error: (err) => console.error('Erro ao carregar crianças:', err),
    });
  }

  // loadImages(): void {
  //   this.dadosCriancas.forEach((crianca) => {
  //     this.dados.getImageBase64(crianca.id).subscribe(
  //       (response) => {
  //         if (response && response.Image) {
  //           this.imagens[crianca.id] = response.Image; // Armazene a imagem no dicionário
  //         }
  //       },
  //       (error) => {
  //         console.error('Erro ao carregar a imagem:', error);
  //       }
  //     );
  //   });
  // }

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
          console.log('Crianças encontradas:', data);

          // Atualiza criancaId com o ID da primeira criança encontrada
          if (data.length > 0) {
            this.criancaId = data[0].id; // Atualiza com o ID da primeira criança encontrada
          }

          // Carregar imagens para as crianças encontradas
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

    // Limpa os filtros após a busca
    this.nomeCrianca = '';
    this.idsala = undefined;
    this.codigo = '';
  }

  // Nova função para carregar as imagens
  loadImages(): void {
    this.dadosCriancas.forEach((crianca) => {
      this.pictureService.getFoto(crianca.id).subscribe(
        (response) => {
          console.log('Resposta da imagem:', response);  // Mostra a resposta recebida no console
          crianca.foto = response.foto;  // Atribui a imagem Base64 à propriedade 'foto'

          // Verifica se a foto foi retornada
          if (response.foto) {
            crianca.imageUrl = response.foto;  // 'response.foto' já deve estar no formato correto
          } else {
            crianca.imageUrl = '../../../assets/user.png'; // Imagem padrão caso não haja foto
          }
        },
        (error) => {
          console.log('Erro ao carregar a foto da criança:', error);
          crianca.imageUrl = '../../../assets/user.png'; // Define imagem padrão em caso de erro
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
    // Verifica se a imagem existe antes de tentar acessá-la
    const imageUrl = this.imagens[criancaId] || '../../../assets/user.png'; // Usa a imagem padrão se não houver imagem
    const dialogRef = this.dialog.open(ImageUploadComponent, {
      data: { id: criancaId, imageUrl: imageUrl }, // Passa a URL da imagem para o modal
      panelClass: 'custom-modal', // Se você estiver usando uma classe CSS personalizada
      width: '600px', // Largura do modal, ajuste conforme necessário
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

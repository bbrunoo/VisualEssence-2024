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

@Component({
  selector: 'app-cadastros',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    CommonModule,
    InstMenuComponent,
    NgFor,
    FormsModule,
    HeaderComponent,
    NgxMaskPipe,
    RouterLink,
    NgxMaskDirective,
    ReactiveFormsModule
  ],
  templateUrl: './cadastros.component.html',
  styleUrl: './cadastros.component.css',
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

  constructor(
    private dados: CadastroUnicoService,
    private salasService: SalasService,
  ) {}
  ngOnInit(): void {
    this.loadSalas();
    this.searchCriancas();
    this.getCriancas();
  }

  getCriancas() {
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
        }));
        console.log('Crianças carregadas com sucesso!', this.dadosCriancas);
      },
      error: console.error,
    });
  }

  searchConsole(){
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
        data => {
          this.dadosCriancas = data;
          this.erroBusca = data.length === 0;
          console.log('Crianças encontradas:', data);
        },
        error => {
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
}

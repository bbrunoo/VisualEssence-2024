import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgIf, CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { OpcCadastComponent } from '../opc-cadast/opc-cadast.component';
import { InstMenuComponent } from '../shared-menu/inst-menu/inst-menu.component';
import { SalasService } from '../Services/salas/salas.service';
import { CadastroUnicoService } from '../Services/cadastrounico/cadastro-unico.service';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { GetSala } from '../../../Models/InstituicaoModels/GetSala.model';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-cadast-uni',
  standalone: true,
  imports: [RouterLink, NgIf, CommonModule, FormsModule, OpcCadastComponent, InstMenuComponent, NgxMaskPipe, NgxMaskDirective, ReactiveFormsModule],
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

  constructor(private salaService:SalasService, private dadosC:CadastroUnicoService, private router: Router){}

  salas: GetSala[] =[]
  ngOnInit() {
    this.salaService.getSalas().subscribe(salas => {
      this.salas = salas;
    }, error => {
      console.error('Erro ao buscar salas:', error);
    });
  }

  dadosCriancas = {
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
    sala:{
      id: '',
      nome: '',
      capacidade: ''
    }
  };
  sexos = [
    { valor: 'F', texto: 'Feminino' },
    { valor: 'M', texto: 'Masculino' }
  ];


  getSalas(){
    this.salaService.getSalas().subscribe(
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
    this.salaService.getSalaById(idSala).subscribe(
      sala => {
        this.dadosCriancas.sala = {
          id: sala.id,
          nome: sala.nome,
          capacidade: sala.capacidade
        };
      },
      error => {
        console.error('Erro ao buscar os dados da sala:', error);
      }
    );
  }
  cadastrarCrianca() {
    if (this.dadosCriancas.idSala) {
      this.atualizarDadosSala(this.dadosCriancas.idSala);
      setTimeout(() => {
        console.log('Dados da criança a serem enviados:', this.dadosCriancas);
        this.dadosC.cadastrarUnico(this.dadosCriancas).subscribe(
          response => {
            Swal.fire({
              title: 'Sucesso!',
              text: 'Crianca cadastrada com sucesso.',
              imageUrl: '../../../../assets/icons/check.png',
              imageWidth: 100,
              imageHeight: 100,
              confirmButtonText: 'OK',
              confirmButtonColor: '#0abf2f',
              heightAuto: false,
            });
            this.changePage();

            console.log('Criança cadastrada com sucesso:', response);
          },
          error => {
            Swal.fire({
              title: 'Falha!',
              text: 'Não foi possível cadastrar a crianca.',
              imageUrl: '../../../../assets/icons/cancel.png',
              imageWidth: 100,
              imageHeight: 100,
              confirmButtonText: 'OK',
              confirmButtonColor: '#d9534f',
              heightAuto: false,
            });
            console.error('Erro ao cadastrar criança:', error);
          }
        );
      }, 1000);
    } else {
      console.error('ID da sala não fornecido.');
    }
  }

  changePage(){
    this.router.navigate(['/instituicao/cadastros']);
  }

  showNew = false;
  toggleContent() {
    this.showNew = !this.showNew;
  }
}

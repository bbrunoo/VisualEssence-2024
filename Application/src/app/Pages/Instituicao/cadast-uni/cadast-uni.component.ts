import { UserInst } from './../../../Models/UserInst.Model';
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
import { loggedUser } from '../../../Models/LoggedUser/user.model';
import { AuthService } from '../../../../Services/Auth/AuthService/auth.service';
import { CriancaInstDTO } from '../../../Models/CriancaInstDTO.model';


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

  constructor(
    private salaService: SalasService,
    private dadosC: CadastroUnicoService,
    private router: Router,
    private userService: AuthService
  ) {}

  salas: GetSala[] =[]
  ngOnInit() {
    this.salaService.getSalas().subscribe(salas => {
      this.salas = salas;
    }, error => {
      console.error('Erro ao buscar salas:', error);
    });

    this.getUser();
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
      capacidade: 0
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
    if (this.dadosCriancas.idSala && this.user) {
      // Criação do objeto CriancaInstDTO
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
        idSala: this.dadosCriancas.idSala, // Apenas o ID da sala
        userInstId: this.user.id // Apenas o ID do usuário
      };

      console.log('Dados da criança a serem enviados:', criancaDTO);
      this.dadosC.cadastrarUnico(criancaDTO).subscribe(
        response => {
          Swal.fire({
            title: 'Sucesso!',
            text: 'Criança cadastrada com sucesso.',
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
            text: 'Não foi possível cadastrar a criança.',
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
    } else {
      console.error('ID da sala ou usuário não fornecido.');
    }
  }


  changePage(){
    this.router.navigate(['/instituicao/cadastros']);
  }

  showNew = false;
  toggleContent() {
    this.showNew = !this.showNew;
  }

  user: loggedUser = {id: '', nome:'', email: '', isInstitucional: false, isPais: false}
  getUser(){
    this.userService.getUserProfile().subscribe(
      (data) => {
        this.user = data;
        console.log('dados do usuario', this.user);
      },
      (error) =>
      {
        console.log('Erro ao recuperar dados do usuario', error);
      }
    )
  }
}

import { VlibrasComponent } from './../../vlibras/vlibras.component';
import { GetCriancas } from './../../../Models/InstituicaoModels/GetCriancas.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InstMenuComponent } from '../shared-menu/inst-menu/inst-menu.component';
import { CadastroUnicoService } from '../Services/cadastrounico/cadastro-unico.service';
import { SalasService } from '../Services/salas/salas.service';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective } from 'ngx-mask';
import { GetSala } from '../../../Models/InstituicaoModels/GetSala.model';
import Swal from 'sweetalert2';
import { AuthService } from '../../../../Services/Auth/AuthService/auth.service';
import { ChatBotIconeComponent } from '../../chat-bot-conteudo/chat-bot-icone/chat-bot-icone.component';

@Component({
  selector: 'app-edt-dad',
  standalone: true,
  imports: [VlibrasComponent, RouterLink, FormsModule, InstMenuComponent, CommonModule, NgxMaskDirective, ReactiveFormsModule, ChatBotIconeComponent],
  templateUrl: './edt-dad.component.html',
  styleUrls: ['./edt-dad.component.css']
})
export class EdtDadComponent implements OnInit {
  criancaId!: string;
  selectedCrianca: GetCriancas | null = null;
  salas: GetSala[] = [];
  crianca!: GetCriancas;

  sexos = [
    { valor: 'F', texto: 'Feminino' },
    { valor: 'M', texto: 'Masculino' }
  ];

  constructor(
    private criancaService: CadastroUnicoService,
    private salaService: SalasService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private routerGo: Router
  ) {}
  userInstId: string = String(this.authService.getUserIdFromToken());

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.criancaId = id;
      this.loadCriancaData();
    } else {
      console.error('ID não encontrado na rota');
    }
    this.getSalas();
  }

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

  getSalas(): void {
    this.salaService.getSalaByUserId(this.userInstId).subscribe(
      response => {
        this.salas = response;
      },
      error => {
        console.error('Não foi possível carregar as salas!', error);
      }
    );
  }

  onSalaChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;

    console.log('Sala selecionada:', selectedValue);
  }

  updateCrianca(): void {
    console.log("ID da sala a ser atualizada:", this.crianca.idSala);

    Swal.fire({
      title: 'Confirmação',
      text: 'Você realmente deseja atualizar essas informações?',
      imageUrl: '../../../../assets/icons/danger.png',
      imageWidth: 100,
      imageHeight: 100,
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      customClass: {
        title: 'custom-swal-title',
        htmlContainer: 'custom-swal-text',
      },
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      heightAuto: false
    }).then((result) => {
      if (result.isConfirmed) {
        this.criancaService.editCrianca(this.criancaId, this.crianca).subscribe(
          response => {
            console.log("Criança atualizada:", response);
            Swal.fire({
              title: 'Sucesso!',
              text: 'Dados atualizados com sucesso.',
              imageUrl: '../../../../assets/icons/check.png',
              imageWidth: 100,
              imageHeight: 100,
              customClass: {
                title: 'custom-swal-title',
                htmlContainer: 'custom-swal-text',
              },
              confirmButtonText: 'OK',
              confirmButtonColor: '#3085d6',
              heightAuto: false
            }).then(() => {
              this.routerGo.navigate(['/instituicao/cadastros']);
              this.selectedCrianca = null;
            });
          },
          error => {
            console.error('Erro ao atualizar criança:', error);
            Swal.fire({
              title: 'Erro',
              text: 'Não foi possível atualizar os dados.',
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
          }
        );
      } else {
        Swal.fire({
          title: 'Cancelado',
          text: 'Dados não atualizados.',
          imageUrl: '../../../../assets/icons/cancel.png',
          imageWidth: 100,
          imageHeight: 100,
          confirmButtonText: 'OK',
          customClass: {
            title: 'custom-swal-title',
            htmlContainer: 'custom-swal-text',
          },
          confirmButtonColor: '#3085d6',
          heightAuto: false
        });
      }
    });
  }
}

import { Sala } from './../../../Models/InstituicaoModels/GetCriancas.model';
import { VlibrasComponent } from './../../vlibras/vlibras.component';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SalasService } from '../Services/salas/salas.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CadastMassaComponent } from '../cadast-massa/cadast-massa.component';
import { CadastUniComponent } from '../cadast-uni/cadast-uni.component';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-opc-criar-sala',
  standalone: true,
  imports: [
    VlibrasComponent,
    RouterLink, NgIf, CommonModule, CadastUniComponent, CadastMassaComponent, FormsModule],
  templateUrl: './opc-criar-sala.component.html',
  styleUrl: './opc-criar-sala.component.css',
  animations: [
    trigger('fadeAnimation', [
      state('void', style({ opacity: 0 })),
      transition('void <=> *', [animate('500ms ease-in-out')]),
    ]),
  ],
})
export class OpcCriarSalaComponent {
  constructor(private salaService: SalasService) { }
  ngOnInit(): void {
    this.getSalas();
  }

  salas?: Sala[]

  sala = {
    nome: '',
    capacidade: 0
  }

  addSala() {
    console.log(this.sala)
    this.salaService.createSala(this.sala).subscribe(
      response => {
        console.log('Sala criada com sucesso!', response);
        Swal.fire({
          title: 'Sucesso!',
          text: 'Sala criada com sucesso.',
          imageUrl: '../../../../assets/icons/check.png',
          imageWidth: 100,
          imageHeight: 100,
          confirmButtonText: 'OK',
          confirmButtonColor: '#0abf2f',
          heightAuto: false,
        });
        this.clearForm();
        this.getSalas();
      },
      error => {
        console.error('Não foi possível criar a sala!', error);
        Swal.fire({
          title: 'Falha!',
          text: 'Não foi possível criar a sala.',
          imageUrl: '../../../../assets/icons/cancel.png',
          imageWidth: 100,
          imageHeight: 100,
          confirmButtonText: 'OK',
          confirmButtonColor: '#d9534f',
          heightAuto: false,
        });
      }
    )
  }

  getSalas() {
    this.salaService.getSalas().subscribe(
      response => {
        console.log('Salas carregadas com sucesso!', response);
        this.salas = response;
      },
      error => {
        console.error('Não foi possível carregar as salas!', error);
      }
    )
  }

  deleteSala(salaDel: Sala): void {
    Swal.fire({
        title: 'Confirmação',
        text: 'Você realmente deseja excluir esta sala? Todas as crianças cadastradas nessa sala serão excluídas!',
        imageUrl: '../../../../assets/icons/danger.png',
        imageWidth: 100,
        imageHeight: 100,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            this.salaService.deleteSala(salaDel).subscribe(
                response => {
                    console.log("Sala excluída com sucesso:", response);
                    Swal.fire({
                        title: 'Sucesso!',
                        text: 'Sala excluída com sucesso.',
                        imageUrl: '../../../../assets/icons/check.png',
                        imageWidth: 100,
                        imageHeight: 100,
                        confirmButtonText: 'OK'
                    }).then(() => {
                        this.getSalas();
                    });
                },
                error => {
                    console.error('Erro ao excluir sala:', error);
                    Swal.fire({
                        title: 'Erro',
                        text: 'Não foi possível excluir a sala.',
                        imageUrl: '../../../../assets/icons/error.png',
                        imageWidth: 100,
                        imageHeight: 100,
                        confirmButtonText: 'OK'
                    });
                }
            );
        }
    });
}

  clearForm() {
    this.sala = {
      nome: '',
      capacidade: 0
    };
  }

  showCriarS = false;
  showOpCad = false;
  showCadUni = false;
  showCadMas = false;

  toggleCriarS() {
    this.showCriarS = !this.showCriarS;
  }

  toggleOpCad() {
    this.showOpCad = !this.showOpCad;
  }
}

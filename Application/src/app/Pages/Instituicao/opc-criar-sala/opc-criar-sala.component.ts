import { Sala } from './../../../Models/InstituicaoModels/GetCriancas.model';
import { VlibrasComponent } from './../../vlibras/vlibras.component';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SalasService } from '../Services/salas/salas.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from '../../../../Services/Auth/AuthService/auth.service';
import { ChatBotIconeComponent } from "../../chat-bot-conteudo/chat-bot-icone/chat-bot-icone.component";
import { FontSizeService } from '../../Font/font-size.service';

@Component({
  selector: 'app-opc-criar-sala',
  standalone: true,
  imports: [
    VlibrasComponent,
    RouterLink,
    NgIf,
    CommonModule,
    FormsModule,
    ChatBotIconeComponent
],
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

  constructor(
    private salaService: SalasService,
    private authService: AuthService,
    private router: Router,
    public fontSizeService: FontSizeService
  ) {}

  salas?: Sala[];
  userInstId: string = String(this.authService.getUserIdFromToken());
  isFormValid: boolean = false;
  isSubmitting: boolean = false;

  sala = {
    nome: '',
    capacidade: 0,
    userInstId: this.userInstId,
  };

  ngOnInit(): void {
    this.getSalas();

    this.fontSizeService.initializeFontSize('txHB', 18);
    this.fontSizeService.initializeFontSize('txInp', 17);
    this.fontSizeService.initializeFontSize('txSala', 16);
    this.fontSizeService.initializeFontSize('txDad', 15);
  }

  getFontSizeClass(): string {
    if (this.fontSizeService.fontSizeMultiplier > 1.2) {
      return 'size1_2';
    }
    return '';
  }

  validateForm() {
    this.isFormValid =
      this.sala.nome.trim().length > 0 && this.sala.capacidade > 0;
  }

  addSala() {
    if (!this.isFormValid) {
      return;
    }

    this.isSubmitting = true;

    this.salaService
      .createSala(this.sala)
      .subscribe(
        (response) => {
          Swal.fire({
            title: 'Sucesso!',
            text: 'Sala criada com sucesso.',
            imageUrl: '../../../../assets/icons/check.png',
            imageWidth: 100,
            imageHeight: 100,
            confirmButtonText: 'OK',
            confirmButtonColor: '#0abf2f',
            customClass: {
              title: 'custom-swal-title',
              htmlContainer: 'custom-swal-text',
            },
            heightAuto: false,
          });
          this.clearForm();
          this.getSalas();
        },
        (error) => {
          Swal.fire({
            title: 'Falha!',
            text: 'Não foi possível criar a sala.',
            imageUrl: '../../../../assets/icons/cancel.png',
            imageWidth: 100,
            imageHeight: 100,
            confirmButtonText: 'OK',
            confirmButtonColor: '#d9534f',
            customClass: {
              title: 'custom-swal-title',
              htmlContainer: 'custom-swal-text',
            },
            heightAuto: false,
          });
        }
      )
      .add(() => {
        this.isSubmitting = false;
      });
  }

  getSalas() {
    this.salaService.getSalaByUserId(this.userInstId).subscribe(
      (response) => {
        this.salas = response;
      },
      (error) => {
        console.error('Não foi possível carregar as salas!', error);
      }
    );
  }

  clearForm() {
    this.sala = {
      nome: '',
      capacidade: 0,
      userInstId: this.userInstId,
    };
    this.isFormValid = false;
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
      customClass: {
        title: 'custom-swal-title',
        htmlContainer: 'custom-swal-text',
      },
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.salaService.deleteSala(salaDel).subscribe(
          (response) => {
            console.log('Sala excluída com sucesso:', response);
            Swal.fire({
              title: 'Sucesso!',
              text: 'Sala excluída com sucesso.',
              imageUrl: '../../../../assets/icons/check.png',
              customClass: {
                title: 'custom-swal-title',
                htmlContainer: 'custom-swal-text',
              },
              imageWidth: 100,
              imageHeight: 100,
              confirmButtonText: 'OK',
            }).then(() => {
              this.reloadRoute();
              this.getSalas();
            });
          },
          (error) => {
            console.error('Erro ao excluir sala:', error);
            Swal.fire({
              title: 'Erro',
              text: 'Não foi possível excluir a sala.',
              imageUrl: '../../../../assets/icons/error.png',
              customClass: {
                title: 'custom-swal-title',
                htmlContainer: 'custom-swal-text',
              },
              imageWidth: 100,
              imageHeight: 100,
              confirmButtonText: 'OK',
            });
          }
        );
      }
    });
  }

  reloadRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
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

import { Component } from '@angular/core';
import { ContatoServiceService } from '../../../Services/Contato/contato-service.service';
import { ContatoModel } from '../../Models/ContatoEntitie/contato.model';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from "../PaisHome/Shared-Pais/header/header.component";
import { BackHeaderComponent } from "../PaisHome/Shared-Pais/back-header/back-header.component";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contato',
  standalone: true,
  imports: [FormsModule, RouterLink, HeaderComponent, BackHeaderComponent],
  templateUrl: './contato.component.html',
  styleUrl: './contato.component.css',
  providers: [ContatoServiceService],
})
export class ContatoComponent {

  Contato = new ContatoModel('', '', '', '');

  constructor(private contato: ContatoServiceService, private router: Router) {
  }

  sendFeedback() {
    this.contato.sendFeedback(this.Contato).subscribe({
      next: (response) => {
        Swal.fire({
          title: 'Sucesso!',
          text: 'Feedback enviado com sucesso.',
          imageUrl: '../../../../assets/icons/check.png',
          imageWidth: 100,
          imageHeight: 100,
          confirmButtonText: 'OK',
          confirmButtonColor: '#3085d6',
          heightAuto: false
        });
      },
      error: (error) => {
        Swal.fire({
          title: 'Erro',
          text: 'Não foi possível enviar o seu feedback.',
          imageUrl: '../../../../assets/icons/cancel.png',
          imageWidth: 100,
          imageHeight: 100,
          confirmButtonText: 'OK',
          confirmButtonColor: '#3085d6',
          heightAuto: false
        });
      }
    });
  }
}

import { Component } from '@angular/core';
import { ContatoServiceService } from '../../../Services/Contato/contato-service.service';
import { ContatoModel } from '../../Models/ContatoEntitie/contato.model';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-contato',
  standalone: true,
  imports: [FormsModule, RouterLink],
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
        console.log(response);
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.log("Nao foi possivel enviar", error);
      }
    })
  }
}

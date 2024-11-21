import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LogoMenuComponent } from "../../../SharedMenu/logo-menu/logo-menu.component";

@Component({
  selector: 'app-dalto-num-pais-instrucao',
  standalone: true,
  imports: [LogoMenuComponent],
  templateUrl: './dalto-num-pais-instrucao.component.html',
  styleUrl: './dalto-num-pais-instrucao.component.css'
})
export class DaltoNumPaisInstrucaoComponent {
  constructor(private router: Router) { }
  goToNextScreen(): void {
    this.router.navigate(['/Pais/jogos/daltonismo-numeros']);
  }

  close(): void {
    console.log('Fechar a tela ou outra ação');
  }
}

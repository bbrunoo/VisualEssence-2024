import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LogoMenuInstComponent } from "../../../SharedMenu/logo-menu-inst/logo-menu-inst.component";

@Component({
  selector: 'app-dalto-numeros-inst-instrucao',
  standalone: true,
  imports: [LogoMenuInstComponent],
  templateUrl: './dalto-numeros-inst-instrucao.component.html',
  styleUrl: './dalto-numeros-inst-instrucao.component.css'
})
export class DaltoNumerosInstInstrucaoComponent {
  constructor(private router: Router) { }
  goToNextScreen(): void {
    this.router.navigate(['/instituicao/jogos/daltonismo-numeros']);
  }

  close(): void {
    console.log('Fechar a tela ou outra ação');
  }
}

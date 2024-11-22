import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { VlibrasComponent } from "../../../vlibras/vlibras.component";
import { LogoMenuComponent } from "../../../SharedMenu/logo-menu/logo-menu.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dalto-num-pais-cadastro',
  standalone: true,
  imports: [VlibrasComponent, LogoMenuComponent, FormsModule],
  templateUrl: './dalto-num-pais-cadastro.component.html',
  styleUrl: './dalto-num-pais-cadastro.component.css'
})
export class DaltoNumPaisCadastroComponent {
  nomecrianca = '';
  idadecrianca: number | null = null;

  constructor(private router: Router) {}
  salvarCrianca(){
   console.log(this.nomecrianca, this.idadecrianca);
   localStorage.setItem("nomeCriancaPais", String(this.nomecrianca));
   localStorage.setItem("idadeCriancaPais", String(this.idadecrianca));
   this.router.navigate(["/Pais/jogos/daltonismo-numeros/instrucoes"]);
  }
}

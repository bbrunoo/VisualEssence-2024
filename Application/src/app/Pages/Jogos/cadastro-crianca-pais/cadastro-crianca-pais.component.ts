import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LogoMenuComponent } from "../../SharedMenu/logo-menu/logo-menu.component";
import { VlibrasComponent } from '../../vlibras/vlibras.component';

@Component({
  selector: 'app-cadastro-crianca-pais',
  standalone: true,
  imports: [FormsModule, LogoMenuComponent, VlibrasComponent],
  templateUrl: './cadastro-crianca-pais.component.html',
  styleUrl: './cadastro-crianca-pais.component.css'
})
export class CadastroCriancaPaisComponent {
  nomecrianca = '';
  idadecrianca: number | null = null;

  constructor(private router: Router) {}
  salvarCrianca(){
   console.log(this.nomecrianca, this.idadecrianca);
   localStorage.setItem("nomeCriancaPais", String(this.nomecrianca));
   localStorage.setItem("idadeCriancaPais", String(this.idadecrianca));
   this.router.navigate(["/Pais/jogos/miopia/instrucoes"]);
  }
}

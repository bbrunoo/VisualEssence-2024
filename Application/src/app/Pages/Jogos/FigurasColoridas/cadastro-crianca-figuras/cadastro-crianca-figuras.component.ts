import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LogoMenuComponent } from '../../../SharedMenu/logo-menu/logo-menu.component';
import { VlibrasComponent } from '../../../vlibras/vlibras.component';

@Component({
  selector: 'app-cadastro-crianca-figuras',
  standalone: true,
  imports: [FormsModule, RouterLink, LogoMenuComponent, VlibrasComponent],
  templateUrl: './cadastro-crianca-figuras.component.html',
  styleUrl: './cadastro-crianca-figuras.component.css'
})
export class CadastroCriancaFigurasComponent {
  nomecrianca = '';
  idadecrianca = 0;

  constructor(private router: Router) {}
  salvarCrianca(){
   console.log(this.nomecrianca, this.idadecrianca);
   localStorage.setItem("nomeCriancaPais", String(this.nomecrianca));
   localStorage.setItem("idadeCriancaPais", String(this.idadecrianca));
   this.router.navigate(["/Pais/jogos/figuras-coloridas/instrucoes"]);
  }
}

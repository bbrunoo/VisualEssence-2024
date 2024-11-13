import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { VlibrasComponent } from "../../../vlibras/vlibras.component";
import { LogoMenuComponent } from "../../../SharedMenu/logo-menu/logo-menu.component";
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-miopia-letras-cadastro-pais',
  standalone: true,
  imports: [VlibrasComponent, LogoMenuComponent, CommonModule, NgIf, NgFor, FormsModule],
  templateUrl: './miopia-letras-cadastro-pais.component.html',
  styleUrl: './miopia-letras-cadastro-pais.component.css'
})
export class MiopiaLetrasCadastroPaisComponent {
  nomecrianca = '';
  idadecrianca = 0;

  constructor(private router: Router) {}
  salvarCrianca(){
   console.log(this.nomecrianca, this.idadecrianca);
   localStorage.setItem("nomeCriancaPais", String(this.nomecrianca));
   localStorage.setItem("idadeCriancaPais", String(this.idadecrianca));
   this.router.navigate(["/Pais/jogos/letras/instrucoes"]);
  }
}

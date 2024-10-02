import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { GetCriancas } from '../../../Models/InstituicaoModels/GetCriancas.model';
import { CadastroUnicoService } from '../../Instituicao/Services/cadastrounico/cadastro-unico.service';
import { NgFor, NgIf } from '@angular/common';
import { LogoMenuComponent } from "../../SharedMenu/logo-menu/logo-menu.component";
import { VlibrasComponent } from '../../vlibras/vlibras.component';
import { LogoMenuInstComponent } from "../../SharedMenu/logo-menu-inst/logo-menu-inst.component";

@Component({
  selector: 'app-cadastro-crianca-inst',
  standalone: true,
  imports: [FormsModule, RouterLink, NgFor, NgIf, LogoMenuComponent, VlibrasComponent, LogoMenuInstComponent],
  templateUrl: './cadastro-crianca-inst.component.html',
  styleUrl: './cadastro-crianca-inst.component.css'
})
export class CadastroCriancaInstComponent implements OnInit {
 idCrianca = '';

 criancas: GetCriancas[] = [];

 selectedCriancaId: string = ''

 constructor(private router: Router, private service:CadastroUnicoService) {}

 ngOnInit(): void {
  this.getCriancas();
}
 getCriancas(){
  this.service.getCadastrados().subscribe({
    next: (response) => {
      this.criancas = response;
      console.log('Crianças carregadas com sucesso!', this.criancas);
    },
    error: (err) => {
      console.error('Erro ao carregar crianças', err);
    }
  })
 }

 onSubmit(): void {
  if(this.selectedCriancaId){
    localStorage.setItem("idCriancaInst", this.selectedCriancaId);
    console.log('Id da criancaInst:', this.selectedCriancaId);
    this.router.navigate(['/instituicao/jogos/miopia/instrucoes']);
  }
  else{
    console.error('nenhuma crianca selecionada');
  }
 }


}

import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { GetCriancas, Sala } from '../../../Models/InstituicaoModels/GetCriancas.model';
import { CadastroUnicoService } from '../../Instituicao/Services/cadastrounico/cadastro-unico.service';
import { NgFor, NgIf } from '@angular/common';
import { LogoMenuComponent } from "../../SharedMenu/logo-menu/logo-menu.component";
import { VlibrasComponent } from '../../vlibras/vlibras.component';
import { LogoMenuInstComponent } from "../../SharedMenu/logo-menu-inst/logo-menu-inst.component";
import { SalasService } from '../../Instituicao/Services/salas/salas.service';

@Component({
  selector: 'app-cadastro-crianca-inst',
  standalone: true,
  imports: [FormsModule, RouterLink, NgFor, NgIf, LogoMenuComponent, VlibrasComponent, LogoMenuInstComponent],
  templateUrl: './cadastro-crianca-inst.component.html',
  styleUrl: './cadastro-crianca-inst.component.css'
})
export class CadastroCriancaInstComponent implements OnInit {
  criancas: GetCriancas[] = [];
  salas: Sala[] = []; // Lista de salas
  criancasFiltradas: GetCriancas[] = []; // Crianças filtradas por sala
  selectedSalaId: string = ''; // ID da sala selecionada
  selectedCriancaId: string = ''; // ID da criança selecionada

  constructor(private router: Router, private service: CadastroUnicoService, private salasServices: SalasService) {}

  ngOnInit(): void {
    this.getCriancas();
    this.getSalas(); // Carregar salas na inicialização
  }

  getCriancas() {
    this.service.getCadastrados().subscribe({
      next: (response) => {
        this.criancas = response;
        console.log('Crianças carregadas:', this.criancas);
      },
      error: (err) => {
        console.error('Erro ao carregar crianças', err);
      }
    });
  }

  getSalas() {
    // Supondo que você tenha um método no seu serviço para obter salas
    this.salasServices.getSalas().subscribe({
      next: (response) => {
        this.salas = response;
        console.log('Salas carregadas:', this.salas);
      },
      error: (err) => {
        console.error('Erro ao carregar salas', err);
      }
    });
  }

  onSalaChange() {
    // Filtrar crianças com base na sala selecionada
    if (this.selectedSalaId) {
      this.criancasFiltradas = this.criancas.filter(crianca => crianca.idSala === this.selectedSalaId);
    } else {
      this.criancasFiltradas = [];
    }
    this.selectedCriancaId = ''; // Resetar a seleção de criança ao mudar de sala
  }

  onSubmit(): void {
    if (this.selectedCriancaId) {
      localStorage.setItem("idCriancaInst", this.selectedCriancaId);
      console.log('Id da criança Inst:', this.selectedCriancaId);
      this.router.navigate(['/instituicao/jogos/miopia/instrucoes']);
      } else {
      console.error('Nenhuma criança selecionada');
    }
  }


//  idCrianca = '';

//  criancas: GetCriancas[] = [];

//  selectedCriancaId: string = ''

//  constructor(private router: Router, private service:CadastroUnicoService, private salasServices:SalasService) {}

//  ngOnInit(): void {
//   this.getCriancas();
// }

// getCriancas() {
//   this.service.getCadastrados().subscribe({
//     next: (response) => {
//       this.criancas = response;
//       // Para cada criança, busque os detalhes da sala com base no idSala
//       this.criancas.forEach(crianca => {
//         this.salasServices.getSalaById(crianca.idSala).subscribe(sala => {
//           crianca.sala = sala;  // Associa os detalhes da sala à criança
//         });
//       });
//       console.log('Crianças com sala:', this.criancas);
//     },
//     error: (err) => {
//       console.error('Erro ao carregar crianças', err);
//     }
//   });
// }

//  onSubmit(): void {
//   if(this.selectedCriancaId){
//     localStorage.setItem("idCriancaInst", this.selectedCriancaId);
//     console.log('Id da criancaInst:', this.selectedCriancaId);
//     this.router.navigate(['/instituicao/jogos/miopia/instrucoes']);
//   }
//   else{
//     console.error('nenhuma crianca selecionada');
//   }
//  }


}

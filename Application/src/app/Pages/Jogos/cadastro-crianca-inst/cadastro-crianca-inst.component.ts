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
import { AuthService } from '../../../../Services/Auth/AuthService/auth.service';

@Component({
  selector: 'app-cadastro-crianca-inst',
  standalone: true,
  imports: [FormsModule, NgFor, LogoMenuInstComponent],
  templateUrl: './cadastro-crianca-inst.component.html',
  styleUrl: './cadastro-crianca-inst.component.css'
})
export class CadastroCriancaInstComponent implements OnInit {
  criancas: GetCriancas[] = [];
  salas: Sala[] = [];
  criancasFiltradas: GetCriancas[] = [];
  selectedSalaId: string = '';
  selectedCriancaId: string = '';
  userInstId: string = String(this.authService.getUserIdFromToken());

  constructor(private router: Router, private service: CadastroUnicoService, private salasServices: SalasService, private authService: AuthService) {}

  ngOnInit(): void {
    this.getCriancas();
    this.getSalas();
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
    this.salasServices.getSalaByUserId(this.userInstId).subscribe({
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
    if (this.selectedSalaId) {
      this.criancasFiltradas = this.criancas.filter(crianca => crianca.idSala === this.selectedSalaId);
    } else {
      this.criancasFiltradas = [];
    }
    this.selectedCriancaId = '';
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
}

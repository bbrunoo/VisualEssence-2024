import { Component, OnInit } from '@angular/core';
import { TesteService } from './teste.service';
import { NgFor, NgIf } from '@angular/common';
import { InstMenuComponent } from "../Instituicao/shared-menu/inst-menu/inst-menu.component";
import { AuthService } from '../../../Services/Auth/AuthService/auth.service';
import { GetCriancas } from '../../Models/InstituicaoModels/GetCriancas.model';

@Component({
  selector: 'app-teste',
  standalone: true,
  imports: [NgIf, NgFor, InstMenuComponent],
  templateUrl: './teste.component.html',
  styleUrl: './teste.component.css'
})
export class TesteComponent implements OnInit{
  criancas: GetCriancas[] = [];
  loading = false;
  error: string | null = null;
  userId: string | null = null;

  constructor(private criancasService: TesteService, private authService: AuthService) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserIdFromToken();
    console.log('User ID from token:', this.userId); // Verifica se o ID do usuário foi recuperado
    // Atribui o ID do usuário à propriedade de classe
    if (this.userId) {
        this.fetchCriancas(this.userId); // Chama o método separado
    } else {
        this.error = 'Usuário não autenticado.';
    }
}

  // Método separado para buscar crianças
  private fetchCriancas(userId: string): void {
    this.loading = true; // Inicia o carregamento
    this.criancasService.getCriancasByUserId(userId).subscribe(
      (data) => {
        this.criancas = data; // Armazena os dados recebidos
        this.loading = false; // Finaliza o carregamento
      },
      (err) => {
        this.error = err.error || 'Erro ao buscar os dados.'; // Armazena mensagem de erro
        this.loading = false; // Finaliza o carregamento
      }
    );
  }
}

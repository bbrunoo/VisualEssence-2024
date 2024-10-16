import { AuthService } from './../../../../../Services/Auth/AuthService/auth.service';
import { GetCriancas } from './../../../../Models/InstituicaoModels/GetCriancas.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DadosCriancas } from '../../../../Models/InstituicaoModels/DadosCrianca';
import { CriancaInstDTO } from '../../../../Models/CriancaInstDTO.model';
import { CriancaImagem } from '../../../../Models/CriancaImagem.model';
import { ImageResponse } from '../../../../Models/ImageResponse.model';

@Injectable({
  providedIn: 'root'
})
export class CadastroUnicoService {
  private apiUrl = 'https://localhost:5200/CriancaInst';
  private apiUrlfilters = 'https://localhost:5200/CriancaInst/filter';

  constructor(private http: HttpClient, private authService: AuthService) { }

  // Cadastrar uma nova criança
  cadastrarUnico(dados: CriancaInstDTO): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.post(`${this.apiUrl}`, dados, { headers });
  }

  // Obter todas as crianças cadastradas para o usuário autenticado
  getCadastrados(): Observable<GetCriancas[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.get<GetCriancas[]>(`${this.apiUrl}`, { headers });
  }

  // Buscar crianças filtradas (sem passar o userId explicitamente)
  getCriancasByQuery(idsala?: string, codigo?: string, nomeCrianca?: string): Observable<GetCriancas[]> {
    let params = new HttpParams();  // Params para filtros opcionais
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });

    if (idsala) {
      params = params.set('idSala', idsala);
    }

    if (codigo) {
      params = params.set('codigo', codigo);
    }

    if (nomeCrianca) {
      params = params.set('nomeCrianca', nomeCrianca);
    }

    return this.http.get<GetCriancas[]>(`${this.apiUrlfilters}`, { params, headers });
  }

  // Obter uma criança por ID
  getById(criancaId: string): Observable<GetCriancas> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.get<GetCriancas>(`${this.apiUrl}/${criancaId}`, { headers });
  }

  // Editar uma criança existente
  editCrianca(criancaId: string, crianca: GetCriancas): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.put<any>(`${this.apiUrl}/${criancaId}`, crianca, { headers });
  }
}

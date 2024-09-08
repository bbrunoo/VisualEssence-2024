import { GetCriancas } from './../../../../Models/InstituicaoModels/GetCriancas.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DadosCriancas } from '../../../../Models/InstituicaoModels/DadosCrianca';

@Injectable({
  providedIn: 'root'
})
export class CadastroUnicoService {
  private apiUrl = 'https://localhost:5200/CriancaInst';
  private apiUrlfilters = 'https://localhost:5200/CriancaInst/filter';

  constructor(private http: HttpClient) { }

  cadastrarUnico(dados: DadosCriancas): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, dados);
  }

  getCadastrados(): Observable<GetCriancas[]> {
    return this.http.get<GetCriancas[]>(`${this.apiUrl}`);
  }

  getCriancasByQuery(idsala?: string, codigo?: string, nomeCrianca?: string): Observable<GetCriancas[]> {
    let params = new HttpParams();

    if (idsala) {
      params = params.set('idsala', idsala);
    }

    if (codigo) {
      params = params.set('codigo', codigo);
    }

    if (nomeCrianca) {
      params = params.set('nomeCrianca', nomeCrianca);
    }

    return this.http.get<GetCriancas[]>(`${this.apiUrlfilters}`, { params });
  }

  getById(criancaId: string): Observable<GetCriancas> {
    return this.http.get<GetCriancas>(`${this.apiUrl}/${criancaId}`);
  }

  editCrianca(criancaId: string, crianca: GetCriancas): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${criancaId}`, crianca);
  }
}

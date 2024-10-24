import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetCriancas } from '../../../../Models/InstituicaoModels/GetCriancas.model';
import { forkJoin, map, mergeMap, Observable, of, catchError } from 'rxjs';
import { AuthService } from '../../../../../Services/Auth/AuthService/auth.service';
import { Historico } from '../../../../Models/historico.model';

@Injectable({
  providedIn: 'root'
})
export class HistoricoService {

  private apiUrl = 'https://localhost:5200/CriancaInst';
  private api = 'https://localhost:5200';

  userInstId = String(this.authService.getUserIdFromToken());


  constructor(private http: HttpClient, private authService: AuthService) { }

  getCriancaById(criancaId: string): Observable<GetCriancas> {
    return this.http.get<GetCriancas>(`${this.apiUrl}/${criancaId}`).pipe(
      catchError(error => {
        console.error(`Erro ao obter criança com ID ${criancaId}`, error);
        return of();
      })
    );
  }

  getAllJogadas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/JogadaInst`).pipe(
      catchError(error => {
        console.error('Erro ao obter todas as jogadas', error);
        return of([]);
      })
    );
  }

  getHistoricoMiopia(game: string, userId: string): Observable<Historico[]> {
    return this.http.get<Historico[]>(`${this.api}/JogadaInst/historico/${game}/${userId}`).pipe(
      catchError(error => {
        console.error(`Erro ao obter histórico de miopia`, error);
        console.log("UserId DA CHAMADA:", this.userInstId);
        return of([]);
      })
    );
  }

  getHistoricoDaltonismo(game: string, userId: string): Observable<Historico[]> {
    return this.http.get<Historico[]>(`${this.api}/JogadaInst/historico/${game}/${userId}`).pipe(
      catchError(error => {
        console.error(`Erro ao obter histórico de dalt`, error);
        console.log("UserId DA CHAMADA:", this.userInstId);
        return of([]);
      })
    );
  }

  getHistoricoFigurasColoridas(game: string, userId: string): Observable<Historico[]> {
    return this.http.get<Historico[]>(`${this.api}/JogadaInst/historico/${game}/${userId}`).pipe(
      catchError(error => {
        console.error(`Erro ao obter histórico de figu`, error);
        console.log("UserId DA CHAMADA:", this.userInstId);
        return of([]);
      })
    );
  }
}

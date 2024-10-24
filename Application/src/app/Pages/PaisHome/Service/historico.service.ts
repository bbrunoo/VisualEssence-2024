import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetCriancas } from '../../../Models/InstituicaoModels/GetCriancas.model';
import { catchError, forkJoin, map, mergeMap, Observable, of } from 'rxjs';
import { Historico } from '../../../Models/historico.model';
import { AuthService } from '../../../../Services/Auth/AuthService/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HistoricoService {
  userInstId = String(this.authService.getUserIdFromToken());

  private apiUrl = 'https://localhost:5200/CriancaPais';
  private api = 'https://localhost:5200';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getCriancaById(criancaId: string): Observable<GetCriancas> {
    return this.http.get<GetCriancas>(`${this.apiUrl}/${criancaId}`).pipe(
      catchError(error => {
        console.error(`Erro ao obter criança com ID ${criancaId}`, error);
        return of();
      })
    );
  }

  getAllJogadas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/JogadaPais`).pipe(
      catchError(error => {
        console.error('Erro ao obter todas as jogadas', error);
        return of([]);
      })
    );
  }

  getHistoricoMiopia(game: string, userId: string): Observable<Historico[]> {
    return this.http.get<Historico[]>(`${this.api}/JogadaPais/historico/${game}/${userId}`).pipe(
      catchError(error => {
        console.error(`Erro ao obter histórico de miopia`, error);
        console.log("UserId DA CHAMADA:", this.userInstId);
        return of([]);
      })
    );
  }

  getHistoricoDaltonismo(game: string, userId: string): Observable<Historico[]> {
    return this.http.get<Historico[]>(`${this.api}/JogadaPais/historico/${game}/${userId}`).pipe(
      catchError(error => {
        console.error(`Erro ao obter histórico de dalt`, error);
        console.log("UserId DA CHAMADA:", this.userInstId);
        return of([]);
      })
    );
  }

  getHistoricoFigurasColoridas(game: string, userId: string): Observable<Historico[]> {
    return this.http.get<Historico[]>(`${this.api}/JogadaPais/historico/${game}/${userId}`).pipe(
      catchError(error => {
        console.error(`Erro ao obter histórico de figu`, error);
        console.log("UserId DA CHAMADA:", this.userInstId);
        return of([]);
      })
    );
  }
}

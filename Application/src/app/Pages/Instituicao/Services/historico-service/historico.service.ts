import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetCriancas } from '../../../../Models/InstituicaoModels/GetCriancas.model';
import { forkJoin, map, mergeMap, Observable, of, catchError } from 'rxjs';
import { AuthService } from '../../../../../Services/Auth/AuthService/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HistoricoService {

  private apiUrl = 'https://localhost:5200/CriancaInst';
  private api = 'https://localhost:5200';

  userInstId = String(this.authService.getUserIdFromToken());

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
    return this.http.get<any[]>(`${this.apiUrl}/JogadaInst`).pipe(
      catchError(error => {
        console.error('Erro ao obter todas as jogadas', error);
        return of([]);
      })
    );
  }

  getHistoricoMiopia(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/JogadaInst/historico/miopia/${this.userInstId}`).pipe(
      catchError(error => {
        console.error('Erro ao obter histórico de Miopia', error);
        return of([]);
      })
    );
  }

  getHistoricoDaltonismo(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/JogadaInst/historico/daltonismo/${this.userInstId}`).pipe(
      catchError(error => {
        console.error('Erro ao obter histórico de Daltonismo', error);
        return of([]);
      })
    );
  }

  getHistoricoFigurasColoridas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/JogadaInst/historico/figuras-coloridas/${this.userInstId}`).pipe(
      catchError(error => {
        console.error('Erro ao obter histórico de Figuras Coloridas', error);
        return of([]);
      })
    );
  }

  getHistoricoComCriancaMiopia(): Observable<any[]> {
    return this.getHistoricoMiopia().pipe(
      mergeMap(jogadas => {
        const observables = jogadas.map(jogada =>
          this.getCriancaById(jogada.idCrianca).pipe(
            map(crianca => ({
              nomeJogo: jogada.nomeJogo,
              nomeCrianca: crianca?.nome ?? 'Desconhecido',
              acertos: jogada.pontuacao,
            })),
            catchError(error => {
              console.error(`Erro ao obter dados da criança ${jogada.idCrianca}`, error);
              return of([{ nomeJogo: jogada.nomeJogo, nomeCrianca: 'Desconhecido', idade: 'Desconhecida', acertos: jogada.pontuacao }]);
            })
          )
        );
        return forkJoin(observables);
      })
    );
  }

  getHistoricoComCriancaDaltonismo(): Observable<any[]> {
    return this.getHistoricoDaltonismo().pipe(
      mergeMap(jogadas => {
        const observables = jogadas.map(jogada =>
          this.getCriancaById(jogada.idCrianca).pipe(
            map(crianca => ({
              nomeJogo: jogada.nomeJogo,
              nomeCrianca: crianca?.nome ?? 'Desconhecido',
              acertos: jogada.pontuacao
            })),
            catchError(error => {
              console.error(`Erro ao obter dados da criança ${jogada.idCrianca}`, error);
              return of([{ nomeJogo: jogada.nomeJogo, nomeCrianca: 'Desconhecido', acertos: jogada.pontuacao }]);
            })
          )
        );
        return forkJoin(observables);
      })
    );
  }

  getHistoricoComCriancaFigurasColoridas(): Observable<any[]> {
    return this.getHistoricoFigurasColoridas().pipe(
      mergeMap(jogadas => {
        const observables = jogadas.map(jogada =>
          this.getCriancaById(jogada.idCrianca).pipe(
            map(crianca => ({
              nomeJogo: jogada.nomeJogo,
              nomeCrianca: crianca?.nome ?? 'Desconhecido',
              acertos: jogada.pontuacao
            })),
            catchError(error => {
              console.error(`Erro ao obter dados da criança ${jogada.idCrianca}`, error);
              return of([{ nomeJogo: jogada.nomeJogo, nomeCrianca: 'Desconhecido', acertos: jogada.pontuacao }]);
            })
          )
        );
        return forkJoin(observables);
      })
    );
  }
}

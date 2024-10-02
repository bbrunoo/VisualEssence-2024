import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetCriancas } from '../../../../Models/InstituicaoModels/GetCriancas.model';
import { forkJoin, map, mergeMap, Observable, of, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistoricoService {

  private apiUrl = 'https://localhost:5200/CriancaInst';
  private api = 'https://localhost:5200';

  constructor(private http: HttpClient) {}

  getCriancaById(criancaId: string): Observable<GetCriancas> {
    return this.http.get<GetCriancas>(`${this.apiUrl}/${criancaId}`).pipe(
      catchError(error => {
        console.error(`Erro ao obter criança com ID ${criancaId}`, error);
        return of(); // Corrigido
      })
    );
  }

  getAllJogadas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/JogadaInst`).pipe(
      catchError(error => {
        console.error('Erro ao obter todas as jogadas', error);
        return of([]); // Corrigido
      })
    );
  }

  // Métodos para obter histórico de cada jogo
  getHistoricoMiopia(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/JogadaInst/historico/miopia`).pipe(
      catchError(error => {
        console.error('Erro ao obter histórico de Miopia', error);
        return of([]);
      })
    );
  }

  getHistoricoDaltonismo(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/JogadaInst/historico/daltonismo`).pipe(
      catchError(error => {
        console.error('Erro ao obter histórico de Daltonismo', error);
        return of([]);
      })
    );
  }

  getHistoricoFigurasColoridas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/JogadaInst/historico/figuras-coloridas`).pipe(
      catchError(error => {
        console.error('Erro ao obter histórico de Figuras Coloridas', error);
        return of([]);
      })
    );
  }

  // Métodos para histórico com criança para cada jogo
  getHistoricoComCriancaMiopia(): Observable<any[]> {
    return this.getHistoricoMiopia().pipe(
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

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../../../../../Services/Auth/AuthService/auth.service';
import { Historico } from '../../../../Models/historico.model';
import { CriancaComJogosDTO } from '../../../../Models/HistoricoJogadas.model';
import { JogadaDetalhadaDTO } from '../../../../Models/JogadaDetalhadaDTO.model';

interface PaginatedResult<T> {
  items: T[];
  totalPages: number;
}

@Injectable({
  providedIn: 'root'
})
export class HistoricoService {
  private api = 'https://localhost:5200';

  userInstId = String(this.authService.getUserIdFromToken());

  constructor(private http: HttpClient, private authService: AuthService) {}

  getUltimosDoisJogosPorCrianca(
    nomeJogo: string,
    nomeCrianca: string,
    pageNumber: number = 1,
    pageSize: number = 10
  ): Observable<PaginatedResult<CriancaComJogosDTO>> {
    const url = `${this.api}/JogadaInst/UltimosDoisJogosPorCrianca/${this.userInstId}`;
    let params = `?pageNumber=${pageNumber}&pageSize=${pageSize}`;

    if (nomeJogo) {
      params += `&nomeJogo=${nomeJogo}`;
    }
    if (nomeCrianca) {
      params += `&nomeCrianca=${nomeCrianca}`;
    }

    console.log('URL requisitada:', `${url}${params}`);
    return this.http.get<PaginatedResult<CriancaComJogosDTO>>(`${url}${params}`).pipe(
      catchError(error => {
        console.error('Erro ao obter os últimos dois jogos por criança', error);
        return of({ items: [], totalPages: 0 });
      })
    );
  }

  getJogadasPorCrianca(idCrianca: string): Observable<JogadaDetalhadaDTO[]> {
    return this.http.get<JogadaDetalhadaDTO[]>(`${this.api}/JogadaInst/jogadas-por-crianca/${idCrianca}`);
  }
}

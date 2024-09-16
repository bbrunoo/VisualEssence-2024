import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MiopiaGame } from '../../../../Models/MiopiaGame/miopiaGame.model';
import { Observable } from 'rxjs';
import { CriancaPais } from '../../../../Models/MiopiaGame/criancapais.model';
import { Jogada } from '../../../../Models/MiopiaGame/jogada.model';

@Injectable({
  providedIn: 'root'
})
export class MiopiaGameService {

  private criancaUrl = "https://localhost:5200/CriancaPais"
  private jogadaUrl = "https://localhost:5200/JogadaPais"

  constructor(private http: HttpClient) { }

  cadastrarCrianca(crianca: CriancaPais): Observable<CriancaPais> {
    return this.http.post<CriancaPais>(`${this.criancaUrl}`, crianca)
  }

  addJogada(jogada: Jogada): Observable<Jogada> {
    return this.http.post<Jogada>(`${this.jogadaUrl}`, jogada)
  }
}

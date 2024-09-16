import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Jogada } from '../../../../Models/MiopiaGame/jogada.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MiopiaInstService {
  private jogadaUrl = "https://localhost:5200/JogadaInst"

  constructor(private http: HttpClient) { }

  addJogada(jogada: Jogada): Observable<Jogada> {
    return this.http.post<Jogada>(`${this.jogadaUrl}`, jogada)
  }
}

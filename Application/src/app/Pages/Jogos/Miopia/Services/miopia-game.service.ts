import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MiopiaGame } from '../../../../Models/MiopiaGame/miopiaGame.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MiopiaGameService {

  private url = "https://localhost:5200"

  constructor(private http: HttpClient) { }
  private getToken(): string | null {
    return localStorage.getItem('token');
  }

  addJogada(jogada: MiopiaGame): Observable<any>
  {
    const token = this.getToken();
    if (!token) {
      console.error('Token JWT não encontrado no localStorage');
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`

    });
    return this.http.post<MiopiaGame>(`${this.url}/Jogada/NewJogada`, jogada, { headers });
  }
}

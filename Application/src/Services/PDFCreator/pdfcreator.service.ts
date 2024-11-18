import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PDFCreatorService {
  private apiUrl = 'https://localhost:5200/PDF';

  constructor(private http: HttpClient) { }

  getJogadasPorCriancaPdf(criancaId: string): Observable<Blob> {
    const url = `${this.apiUrl}/jogadas-por-crianca-pdf/${criancaId}`;
    return this.http.get(url, { responseType: 'blob' });
  }
}

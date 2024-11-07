import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CriancaImagem } from '../../../../Models/CriancaImagem.model';

@Injectable({
  providedIn: 'root'
})
export class PictureService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'https://localhost:5200/CriancaInst';

  uploadFile(id: string, formData: FormData): Observable<string> {
    return this.http.put(`https://localhost:5200/CriancaInst/upload-foto/${id}`, formData, { responseType: 'text' });
  }

  getFoto(id: string): Observable<CriancaImagem> {
    return this.http.get<CriancaImagem>(`${this.apiUrl}/foto/${id}`);
  }

}

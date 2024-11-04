import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CriancaImagem } from '../../../../Models/CriancaImagem.model';

@Injectable({
  providedIn: 'root'
})
export class AccountPictureService {
  constructor(private http: HttpClient) { }

  private apiUrl = 'https://localhost:5200/Account';

  uploadFile(id: string, formData: FormData): Observable<string> {
    return this.http.put(`${this.apiUrl}/inst/upload-foto/${id}`, formData, { responseType: 'text' });
  }

  uploadFilePais(id: string, formData: FormData): Observable<string> {
    return this.http.put(`${this.apiUrl}/pais/upload-foto/${id}`, formData, { responseType: 'text' });
  }

  getFoto(id: string): Observable<CriancaImagem> {
    return this.http.get<CriancaImagem>(`${this.apiUrl}/inst/foto/${id}`);
  }

  getFotoPais(id: string): Observable<CriancaImagem> {
    return this.http.get<CriancaImagem>(`${this.apiUrl}/pais/foto/${id}`);
  }
}

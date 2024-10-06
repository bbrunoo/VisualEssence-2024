import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PictureService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'https://localhost:5200/CriancaInst';

  uploadFile(id: string, formData: FormData): Observable<string> {
    return this.http.put(`https://localhost:5200/CriancaInst/upload-foto/${id}`, formData, { responseType: 'text' });
  }

  getFoto(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/foto/${id}`);
  }

}

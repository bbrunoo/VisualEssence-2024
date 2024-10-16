import { AuthService } from './../../../Services/Auth/AuthService/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TesteService {
  private apiUrl = 'https://localhost:5200/CriancaInst';

  constructor(private http: HttpClient, private authService: AuthService ) { }

  getCriancasByUserId(userId: string): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/ByUser/${userId}`);
  }


}

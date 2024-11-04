import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DadosGraficos } from '../../../../Models/DadosGraficos.model';
import { Observable } from 'rxjs';
import { AuthService } from '../../../../../Services/Auth/AuthService/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DadosService {

  constructor(private http: HttpClient, private authService: AuthService) { }
  userId = String(this.authService.getUserIdFromToken());

  apiUrl = 'https://localhost:5200/JogadaInst/quantidade-por-categoria'

  getDadosGrafico(id: string): Observable<DadosGraficos>{
    return this.http.get<DadosGraficos>(`${this.apiUrl}/${id}`);
  }
}

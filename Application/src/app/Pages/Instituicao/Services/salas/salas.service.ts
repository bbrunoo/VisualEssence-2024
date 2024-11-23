import { Sala } from '../../../../Models/InstituicaoModels/Sala.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetSala } from '../../../../Models/InstituicaoModels/GetSala.model';
import { CriancaSala } from '../../../../Models/CriancaSala.model';

@Injectable({
  providedIn: 'root'
})
export class SalasService {

  constructor(private http:HttpClient) { }

  apiUrl = 'https://localhost:5200/Salas'

  createSala(sala: Sala): Observable<Sala>{
    return this.http.post<Sala>(`${this.apiUrl}`, sala);
  }

  getSalaByUserId(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/User/${userId}`);
  }

  deleteSala(sala: Sala): Observable<Sala> {
    return this.http.delete<Sala>(`${this.apiUrl}/${sala.id}`);
  }

  getCriancasBySalaId(salaId: string): Observable<any> {
    console.log('Requisição para URL:', `${this.apiUrl}/Criancas/${salaId}`); 
    return this.http.get<any>(`${this.apiUrl}/Criancas/${salaId}`);
  }

}

import { Sala } from '../../../../Models/InstituicaoModels/Sala.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetSala } from '../../../../Models/InstituicaoModels/GetSala.model';

@Injectable({
  providedIn: 'root'
})
export class SalasService {

  constructor(private http:HttpClient) { }

  apiUrl = 'https://localhost:5200/Salas'

  getSalas(): Observable<GetSala[]>
  {
    return this.http.get<GetSala[]>(`${this.apiUrl}`);
  }

  createSala(sala: Sala): Observable<Sala>{
    return this.http.post<Sala>(`${this.apiUrl}`, sala);
  }

  getSalaById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}

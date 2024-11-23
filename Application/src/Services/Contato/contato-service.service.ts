import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContatoModel } from '../../app/Models/ContatoEntitie/contato.model';

@Injectable({
  providedIn: 'root'
})
export class ContatoServiceService {
  apiUrl = 'https://localhost:5200/Contato/Contato';

  constructor(private http: HttpClient, private router: Router) {}

  sendFeedback(contato: any): Observable<any> {
    if (contato != null) console.log(contato + ' enviado com sucesso');
    return this.http.post(`${this.apiUrl}`, contato);
  }
}

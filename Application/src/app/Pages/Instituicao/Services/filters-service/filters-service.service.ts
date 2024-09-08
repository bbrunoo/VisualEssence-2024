import { Injectable } from '@angular/core';
import { Sala } from '../../../../Models/InstituicaoModels/Sala.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FiltersServiceService {

  constructor(private http: HttpClient) { }

  apiUrl = 'https://localhost:5200/CriancaInst/filter'

}

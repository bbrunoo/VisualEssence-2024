import { UserInst } from './../../../../Models/User/GetUserInst.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserPais } from '../../../../Models/User/GetUserPais.model';

@Injectable({
  providedIn: 'root'
})
export class UserInfosService {
  private apiUrl = 'https://localhost:5200/Account';

  constructor(private http: HttpClient) { }

  getUserInfoById(id:string): Observable<UserInst>{
    return this.http.get<UserInst>(`${this.apiUrl}/instituicao/${id}`);
  }

  getUserInfoPaisById(id:string): Observable<UserPais>{
    return this.http.get<UserPais>(`${this.apiUrl}/pais/${id}`);
  }
}

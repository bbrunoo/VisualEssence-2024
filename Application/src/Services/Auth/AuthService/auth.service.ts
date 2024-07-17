import { CredentialsInst } from '../../../app/Models/credentialsInst.model';
import { CredentialsPais } from '../../../app/Models/credentialsPais.model';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, map} from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { loggedUser } from '../../../app/Models/LoggedUser/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = 'https://localhost:5200/Account'

  constructor(private http:HttpClient, private router: Router){}
  registerPais(UserPais: any): Observable<any>
  {
    return this.http.post(`${this.apiUrl}/cadastro-pais`, UserPais);
  }

  registerInst(UserInst: any): Observable<any>
  {
    return this.http.post(`${this.apiUrl}/cadastro-inst`, UserInst);
  }

  loginInst(CredentialsInst: CredentialsInst): Observable<any> {

    return this.http.post(`${this.apiUrl}/login-inst`, CredentialsInst)
    .pipe(map((response: any) =>
      {
        localStorage.setItem('token', response.token);
        return response;
      }));
  }

  loginPais(CredentialsPais: CredentialsPais): Observable<any> {
    return this.http.post(`${this.apiUrl}/login-pais`, CredentialsPais)
    .pipe(map((response: any) =>
      {
        localStorage.setItem('token', response.token);
        return response;
      }));
  }
  logout() {
    localStorage.removeItem('token');
  }
  private getToken(){
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getUserProfile(): Observable<loggedUser>
  {
    const token = this.getToken();
    if (!token) {
      console.error('Token JWT não encontrado no localStorage');
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })

    return this.http.get<loggedUser>(`${this.apiUrl}/user-infos`, { headers });
  }
}

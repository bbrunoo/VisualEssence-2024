import { CredentialsInst } from '../../../app/Models/credentialsInst.model';
import { CredentialsPais } from '../../../app/Models/credentialsPais.model';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable, map} from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = 'https://localhost:7063/api/Auth'

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
  getToken(){
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getUserLogged(): Observable<any> {
    const token = this.getToken();
    if (token) {
      const decodedToken: any = jwtDecode(token);
      const userId = decodedToken.userId; // Supondo que o token possui um campo userId
      const userType = decodedToken.userType; // Supondo que o token possui um campo userType indicando o tipo de usuário (inst ou pais)

      let route = '';
      if (userType === 'inst') {
        route = 'instituicao';
      } else if (userType === 'pais') {
        route = 'pais';
      }

      return this.http.get(`${this.apiUrl}/${route}/${userId}`);
    } else {
      return new Observable();
    }
  }
}

import { CredentialsInst } from '../../../app/Models/credentialsInst.model';
import { CredentialsPais } from '../../../app/Models/credentialsPais.model';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, catchError, switchMap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { loggedUser } from '../../../app/Models/LoggedUser/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = 'https://localhost:5200/Account';

  constructor(private http: HttpClient, private router: Router) {}

  registerPais(UserPais: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/cadastro-pais`, UserPais);
  }

  registerInst(UserInst: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/cadastro-inst`, UserInst);
  }

  loginInst(CredentialsInst: CredentialsInst): Observable<any> {
    return this.http.post(`${this.apiUrl}/login-inst`, CredentialsInst)
      .pipe(map((response: any) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('refreshToken', response.refreshToken); // Armazena o refresh token
        return response;
      }));
  }

  loginPais(CredentialsPais: CredentialsPais): Observable<any> {
    return this.http.post(`${this.apiUrl}/login-pais`, CredentialsPais)
      .pipe(map((response: any) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('refreshToken', response.refreshToken); // Armazena o refresh token
        return response;
      }));
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken'); // Remove o refresh token
  }

  private getToken() {
    return localStorage.getItem('token');
  }

  private getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getUserProfile(): Observable<loggedUser> {
    const token = this.getToken();
    if (!token) {
        console.error('Token JWT não encontrado no localStorage');
        return new Observable<loggedUser>(); // Retorna um observable vazio
    }

    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    });

    return this.http.get<loggedUser>(`${this.apiUrl}/user-infos`, { headers })
        .pipe(
            catchError((error) => {
                if (error.status === 401) { 
                    return this.refreshToken().pipe(
                        switchMap(() => this.getUserProfile())
                    );
                }
                throw error;
            })
        );
}

  private refreshToken(): Observable<any> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      console.error('Refresh token não encontrado');
      return new Observable(); // Retorna um observable vazio
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${refreshToken}`
    });

    return this.http.post<any>(`${this.apiUrl}/refresh-token`, {}, { headers })
      .pipe(map((response: any) => {
        localStorage.setItem('token', response.token); // Atualiza o token
        return response;
      }));
  }

  getUserIdFromToken(): string | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }
    const decoded: any = jwtDecode(token);
    return decoded.id;
  }
}

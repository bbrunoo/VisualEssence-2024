import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from '../../Services/Auth/AuthService/auth.service';
import { Router } from '@angular/router';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();

    // Se existir um token, clonamos a requisição e adicionamos o cabeçalho de autorização
    if (token) {
      const clonedReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });

      return next.handle(clonedReq).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            // Se houver um erro 401 (não autorizado), tenta refrescar o token
            return this.authService.refreshToken().pipe(
              switchMap(() => {
                const newToken = this.authService.getToken();
                if (newToken) {
                  const retryReq = req.clone({
                    headers: req.headers.set('Authorization', `Bearer ${newToken}`)
                  });
                  return next.handle(retryReq); // Refaz a requisição com o novo token
                }
                return throwError(() => error);
              }),
              catchError((refreshError) => {
                // Se a tentativa de refresh falhar, faz logout e redireciona
                this.authService.logout();
                this.router.navigate(['/login']);
                return throwError(() => refreshError);
              })
            );
          }
          return throwError(() => error);
        })
      );
    }

    return next.handle(req); // Se não houver token, apenas passa a requisição adiante
  }
}

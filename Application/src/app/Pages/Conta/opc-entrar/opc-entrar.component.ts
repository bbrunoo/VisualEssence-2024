import { VlibrasComponent } from './../../vlibras/vlibras.component';
import { Component, Injectable } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LogoMenuComponent } from "../../SharedMenu/logo-menu/logo-menu.component";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../../../Services/Auth/AuthService/auth.service';

@Component({
  selector: 'app-opc-entrar',
  standalone: true,
  imports: [VlibrasComponent, RouterLink, RouterLinkActive, LogoMenuComponent],
  templateUrl: './opc-entrar.component.html',
  styleUrl: './opc-entrar.component.css'
})
export class OpcEntrarComponent {
  imagemFundo: string = '../../../../assets/astroLog.png';
}

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();

    if (token) {
      const clonedReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
      return next.handle(clonedReq);
    }

    return next.handle(req);
  }
}

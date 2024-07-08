import { AuthService } from './../Services/Auth/AuthService/auth.service';
import { CanActivateFn } from '@angular/router';
import { Inject } from '@angular/core';
import { Router } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { JwtHelperService } from '@auth0/angular-jwt';


export const instGuardGuard: CanActivateFn = (route, state) => {
  const authService = Inject(AuthService);
  const router = Inject(Router);

  const token = authService.getToken();

    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('token')
      }

    })

    return token;
  }



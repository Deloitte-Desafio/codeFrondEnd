import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { catchError, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | boolean {
    if (typeof window === 'undefined' || !localStorage.getItem('token')) {
      this.router.navigate(['auth/login']);
      return false;
    }

    const expectedRoles = Array.isArray(route.data['roles'])
      ? route.data['roles']
      : [route.data['role']];

    return this.authService.getCurrentUser().pipe(
      map((user) => {
        if (!user || !expectedRoles.includes(user.tipoUsuario)) {
          console.error(
            'Acesso negado: tipoUsuario não corresponde',
            user?.tipoUsuario,
            expectedRoles
          );
          this.router.navigate(['auth/login']);
          return false;
        }
        return true;
      }),
      catchError(() => {
        this.router.navigate(['auth/login']);
        return [false];
      })
    );
  }
}

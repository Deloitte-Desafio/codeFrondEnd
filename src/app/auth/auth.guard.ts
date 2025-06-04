import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data['role'];
    const token = localStorage.getItem('token');

    if (!token) {
      this.router.navigate(['auth/login']);
      return false;
    }

    // Obtenha o tipoUsuario do usuário logado
    this.authService.getCurrentUser().subscribe({
      next: (user) => {
        if (user.tipoUsuario !== expectedRole) {
          console.error(
            'Acesso negado: tipoUsuario não corresponde',
            user.tipoUsuario,
            expectedRole
          );
          this.router.navigate(['auth/login']);
          return false;
        }
        return true;
      },
      error: () => {
        this.router.navigate(['auth/login']);
        return false;
      },
    });

    return true; // Ajuste conforme necessário, dependendo da lógica assíncrona
  }
}

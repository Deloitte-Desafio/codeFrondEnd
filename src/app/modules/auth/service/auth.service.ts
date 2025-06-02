import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../../../models/user/user.module';

interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  private API_URL = 'http://localhost:8080'; 
  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.loadUserFromStorage();
  }

  private loadUserFromStorage() {
    const token = localStorage.getItem('token');
    if (token) {
      // opcional: decodifique o token para pegar dados do usuário ou chame API para buscar dados
      // Aqui vou assumir que o token contém o email, ou você pode guardar usuário completo.
      const userJson = localStorage.getItem('currentUser');
      if (userJson) {
        this.currentUserSubject.next(JSON.parse(userJson));
      }
    }
  }

  register(user: User) {
    return this.http.post<User>(`${this.API_URL}/users`, user);
  }

  login(email: string, senha: string) {
    return this.http.post<LoginResponse>(`${this.API_URL}/users/login`, { email, senha })
      .pipe(
        tap(response => {
          // Salva o token no localStorage
          localStorage.setItem('token', response.token);

          // Opcional: você pode decodificar o token JWT para pegar dados do usuário
          // ou fazer uma chamada adicional para buscar os dados do usuário.
          // Aqui vamos guardar só o email no currentUserSubject como exemplo.
          const user: User = { nome: '', email, senha: '', tipoUsuario: '' }; // ajuste se precisar
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}

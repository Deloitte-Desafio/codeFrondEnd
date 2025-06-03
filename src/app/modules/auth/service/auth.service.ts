import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../../../models/user/user.module';

interface LoginResponse {
  token: string;
}

interface RegisterResponse {
  id: number;
  nome: string;
  email: string;
  tipoUsuario: string;
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
  if (typeof window !== 'undefined' && localStorage.getItem('token')) {
    const userJson = localStorage.getItem('currentUser');
    if (userJson) {
      this.currentUserSubject.next(JSON.parse(userJson));
    }
  }
}


  register(user: User): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.API_URL}/users`, user)
      .pipe(
        catchError(this.handleError)
      );
  }

  login(email: string, senha: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.API_URL}/users/login`, { email, senha })
      .pipe(
        tap(response => {
          localStorage.setItem('token', response.token);
          // Você pode querer buscar os dados completos do usuário após o login
          const user: User = { 
            nome: '', // Será preenchido após chamada adicional
            email, 
            senha: '', // Não armazenamos a senha
            tipoUsuario: '' // Será preenchido após chamada adicional
          };
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocorreu um erro desconhecido';
    if (error.error instanceof ErrorEvent) {
      // Erro do lado do cliente
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      // Erro do lado do servidor
      errorMessage = `Código do erro: ${error.status}, Mensagem: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

  // ... outros métodos permanecem iguais
}
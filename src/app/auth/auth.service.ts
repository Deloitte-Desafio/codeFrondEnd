import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth';
  private userSubject = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {}

  login(email: string, senha: string): Observable<any> {
    return this.http
      .post(
        `${this.apiUrl}/login`,
        { email, senha },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )
      .pipe(
        tap((response: any) => {
          console.log(response);
          localStorage.setItem('token', response.token);
          this.userSubject.next(response.user);
        }),
        catchError((error) => {
          console.error('Erro:', error);
          return throwError(error);
        })
      );
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token);
        this.userSubject.next(response.user);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.userSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  hasRole(role: string): boolean {
    const user = this.userSubject.value;
    return user && user.role === role;
  }

  getCurrentUser(): Observable<any> {
    return this.http.get(`${this.apiUrl}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }
}

import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { AgendamentoDashboard } from '../../../models/agendamento-dashboard.module';
import { AuthResponse } from '../../../models/auth-response.module';

@Injectable({ providedIn: 'root' })
export class AgendamentoService {
  private readonly API = 'http://localhost:8080/';

 constructor(
  private http: HttpClient,
  @Inject(PLATFORM_ID) private platformId: Object
) {}

 private getInfo(): Observable<AuthResponse> {
  if (!isPlatformBrowser(this.platformId)) {
    // Retorna um erro ou um observable vazio, se quiser evitar o throw
    throw new Error('localStorage não está disponível no lado do servidor');
  }

  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Token não encontrado no localStorage');
  }

  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`,
  });

  return this.http.get<AuthResponse>(`${this.API}auth`, { headers });
}

  getProximosAgendamentosDoCliente(): Observable<AgendamentoDashboard[]> {
    return this.getInfo().pipe(
      switchMap((data: AuthResponse) => {
        const clienteId = data.id; // Extrai o id do response
        return this.http.get<AgendamentoDashboard[]>(
          `${this.API}agendamentos/dashboard/cliente/${clienteId}`
        );
      })
    );
  }
}
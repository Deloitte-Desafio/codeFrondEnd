import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { AgendamentoDashboard } from '../../../models/agendamento-dashboard.module';
import { AuthResponse } from '../../../models/auth-response.module';

@Injectable({ providedIn: 'root' })
export class AgendamentoService {
  private readonly API = 'http://localhost:8080/';

  constructor(private http: HttpClient) {}

  private getInfo(): Observable<AuthResponse> {
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

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AgendamentoDashboard } from '../models/agendamento/agendamento-dashboard.module';

@Injectable({ providedIn: 'root' })
export class AgendamentoService {
  private readonly API = 'http://localhost:8080/';

  constructor(private http: HttpClient) {}

  getProximosAgendamentosDoCliente(
    clienteId: number
  ): Observable<AgendamentoDashboard[]> {
    return this.http.get<AgendamentoDashboard[]>(
      `${this.API}agendamentos/dashboard/cliente/${clienteId}`
    );
  }
}

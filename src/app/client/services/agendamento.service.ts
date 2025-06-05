import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {AgendamentoRequest } from '../../models/agendamento.model'

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {

  private apiUrl = 'http://localhost:8080/agendamentos';

  constructor(private http: HttpClient) { }

  criarAgendamento(agendamento: AgendamentoRequest): Observable<any> {
    return this.http.post(this.apiUrl, agendamento);
  }
}
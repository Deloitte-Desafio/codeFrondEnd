import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Servico} from '../../models/servico.model'

@Injectable({
  providedIn: 'root'
})
export class ServicoService {
private apiUrl = 'http://localhost:8080/servicos';

  constructor(private http: HttpClient) {}

  getServicos(): Observable<Servico[]> {
    return this.http.get<Servico[]>(this.apiUrl);
  }
}

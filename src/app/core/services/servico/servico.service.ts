import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';

export interface Servico {
  id: number;
  nome: string;
  descricao: string;
  duracaoMinutos: number;
  profissionalId: number;
  nomeProfissional?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ServicoService {
  private apiUrl = 'http://localhost:8080/servicos';
  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  getServicos(): Observable<Servico[]> {
    let headers = new HttpHeaders();

    if (this.isBrowser) {
      const token = localStorage.getItem('token');
      if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
      }
    }

    return this.http.get<Servico[]>(this.apiUrl, { headers });
  }
}

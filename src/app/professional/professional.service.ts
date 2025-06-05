import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { ServiceRequest, ServiceResponse } from '../models/servico.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ProfessionalService {
  private apiUrl = 'http://localhost:8080/';

  constructor(private http: HttpClient, private authService: AuthService) {}

  searchProfessionals(filters: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/search`, { params: filters });
  }

  getProfessionalServices(): Observable<ServiceResponse[]> {
    return this.authService.getUser().pipe(
      switchMap((pro) => {
        if (!pro?.id) {
          return throwError(
            () => new Error('Usuário não autenticado ou sem ID')
          );
        }
        return this.http.get<ServiceResponse[]>(
          `${this.apiUrl}servicos/profissional/${pro.id}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
      })
    );
  }

  getServices(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}services`);
  }

  createService(service: ServiceRequest): Observable<any> {
    return this.authService.getCurrentUser().pipe(
      switchMap((pro) => {
        const proId = pro.id;
        const payload = {
          nome: service.nome,
          descricao: service.descricao,
          duracaoMinutos: service.duracaoMinutos,
          profissionalId: proId,
        };
        return this.http
          .post(`${this.apiUrl}servicos`, payload, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          })
          .pipe(
            catchError((err) => {
              console.error('Erro na requisição:', err);
              throw new Error(
                'Falha ao criar serviço: ' + (err.error?.message || err.message)
              );
            })
          );
      })
    );
  }

  updateService(serviceId: number, service: ServiceRequest): Observable<any> {
    return this.authService.getCurrentUser().pipe(
      switchMap((pro) => {
        const proId = pro.id;
        const payload = {
          nome: service.nome,
          descricao: service.descricao,
          duracaoMinutos: service.duracaoMinutos,
          profissionalId: proId,
        };
        return this.http.put(`${this.apiUrl}servicos/${serviceId}`, payload);
      })
    );
  }

  deleteService(serviceId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}servicos/${serviceId}`);
  }
}

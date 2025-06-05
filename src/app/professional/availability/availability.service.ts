import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import {
  AvailabilityRequest,
  AvailabilityResponse,
} from '../../models/disponibilidade.model';
import { AuthService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AvailabilityService {
  private apiUrl = 'http://localhost:8080/';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getProfessionalAvailabilities(): Observable<AvailabilityResponse[]> {
    return this.authService.getCurrentUser().pipe(
      switchMap((pro) => {
        const proId = pro.id;
        return this.http.get<AvailabilityResponse[]>(
          `${this.apiUrl}disponibilidades/profissional/${proId}`,
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

  createAvailability(
    availability: AvailabilityRequest
  ): Observable<AvailabilityResponse> {
    return this.authService.getCurrentUser().pipe(
      switchMap((pro) => {
        const proId = pro.id;
        const payload = {
          profissionalId: proId,
          diaDaSemana: availability.diaDaSemana,
          horaInicio: availability.horaInicio,
          horaFim: availability.horaFim,
        };
        return this.http.post<AvailabilityResponse>(
          `${this.apiUrl}disponibilidades`,
          payload,
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

  updateAvailability(
    id: number,
    availability: AvailabilityRequest
  ): Observable<AvailabilityResponse> {
    return this.authService.getCurrentUser().pipe(
      switchMap((pro) => {
        const proId = pro.id;
        const payload = {
          profissionalId: proId,
          diaDaSemana: availability.diaDaSemana,
          horaInicio: availability.horaInicio,
          horaFim: availability.horaFim,
        };
        return this.http.put<AvailabilityResponse>(
          `${this.apiUrl}disponibilidades/${id}`,
          payload,
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

  deleteAvailability(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}disponibilidades/${id}`);
  }
}

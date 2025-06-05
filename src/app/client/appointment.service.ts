import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { AppointmentResponse } from '../models/agendamento.model';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private apiUrl = 'http://localhost:8080/agendamentos';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getClientAppointments(): Observable<any[]> {
    return this.authService.getCurrentUser().pipe(
      switchMap((user) => {
        const userId = user.id;
        return this.http.get<any[]>(
          `${this.apiUrl}/dashboard/cliente/${userId}`,
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

  

  getProfessionalAppointments(): Observable<any[]> {
    return this.authService.getCurrentUser().pipe(
      switchMap((pro) => {
        const proId = pro.id;
        return this.http.get<any[]>(
          `${this.apiUrl}/dashboard/profissional/${proId}`,
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

  getProfessionalAgendaAppointments(): Observable<any[]> {
    return this.authService.getCurrentUser().pipe(
      switchMap((pro) => {
        const proId = pro.id;
        return this.http.get<any[]>(`${this.apiUrl}/profissional/${proId}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
      })
    );
  }

  getAvailableSlots(professionalId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/slots/${professionalId}`);
  }

  createAppointment(appointment: any): Observable<any> {
    return this.http.post(this.apiUrl, appointment);
  }

  cancelAppointment(appointmentId: number): Observable<void> {
    return this.http.put<void>(
      `${this.apiUrl}/${appointmentId}/cancelar`,
      appointmentId
    );
  }

  markAsCompleted(appointmentId: number): Observable<void> {
    return this.http.put<void>(
      `${this.apiUrl}/${appointmentId}/concluir`,
      appointmentId
    );
  }

  cancelApointment(appointmentId: number): Observable<void> {
  return this.http.delete<void>(
    `${this.apiUrl}/${appointmentId}/cancelar`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
  );
}

  
}

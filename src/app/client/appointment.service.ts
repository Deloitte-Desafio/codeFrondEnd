import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { AuthService } from '../auth/auth.service';

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

  getProfessionalAppointments(period: string = 'week'): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/professional?period=${period}`);
  }

  getAvailableSlots(professionalId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/slots/${professionalId}`);
  }

  createAppointment(appointment: any): Observable<any> {
    return this.http.post(this.apiUrl, appointment);
  }

  cancelAppointment(appointmentId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${appointmentId}`);
  }

  markAsCompleted(appointmentId: number): Observable<void> {
    return this.http.patch<void>(
      `${this.apiUrl}/${appointmentId}/complete`,
      {}
    );
  }
}

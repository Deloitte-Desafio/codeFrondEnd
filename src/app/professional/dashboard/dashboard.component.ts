import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../client/appointment.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AppointmentResponse } from '../../models/agendamento.model';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  todayAppointments: AppointmentResponse[] = [];
  activeServices: number = 5; // placeholder para chamada backend
  availabilityStatus: string = 'Configurada'; // placeholder para chamada backend

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit() {
    this.loadTodayAppointments();
  }

  loadTodayAppointments() {
    this.appointmentService.getProfessionalAppointments().subscribe({
      next: (data: AppointmentResponse[]) => {
        console.log(data);
        const today = new Date().toISOString().split('T')[0];
        this.todayAppointments = data.filter(
          (appointment) => appointment.dataHoraInicio.split('T')[0] === today
        );
      },
      error: (err) => console.error('Erro ao carregar agendamentos:', err),
    });
  }
}

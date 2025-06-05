import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../client/appointment.service';
import { AppointmentResponse } from '../../models/agendamento.model';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-agenda',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './agenda.component.html',
  styleUrl: './agenda.component.css',
})
export class AgendaComponent implements OnInit {
  appointments: AppointmentResponse[] = [];

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit() {
    this.loadAppointments();
  }

  loadAppointments() {
    this.appointmentService.getProfessionalAgendaAppointments().subscribe({
      next: (data: AppointmentResponse[]) => {
        this.appointments = data || [];
      },
      error: (err) => console.error('Erro ao carregar agendamentos:', err),
    });
  }

  markAsCompleted(appointmentId: number) {
    if (confirm('Tem certeza que deseja concluir esse agendamento?')) {
      this.appointmentService.markAsCompleted(appointmentId).subscribe({
        next: () => {
          this.loadAppointments();
          alert('Agendamento concluído com sucesso!');
        },
        error: (err) => console.error('Erro ao concluir agendamento:', err),
      });
    }
  }

  cancelAppointment(id: number) {
    if (confirm('Tem certeza que deseja cancelar este agendamento?')) {
      this.appointmentService.cancelAppointment(id).subscribe({
        next: () => {
          this.loadAppointments();
          alert('Agendamento cancelado com sucesso!');
        },
        error: (err) => console.error('Erro ao cancelar agendamento:', err),
      });
    }
  }

  formatStatus(status: string): string {
    const statusMap: { [key: string]: string } = {
      AGENDADO: 'Agendado',
      CONCLUIDO: 'Concluído',
      CANCELADO_CLIENTE: 'Cancelado pelo Cliente',
      CANCELADO_PROFISSIONAL: 'Cancelado pelo Profissional',
    };
    return statusMap[status] || status;
  }
}

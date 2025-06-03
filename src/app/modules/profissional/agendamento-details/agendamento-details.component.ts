import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AgendamentoDashboard } from '../../../models/agendamento-dashboard.module';

@Component({
  selector: 'app-agendamento-details',
  imports: [FormsModule],
  templateUrl: './agendamento-details.component.html',
  styleUrls: ['./agendamento-details.component.css'],
})
export class AgendamentoDetailsComponent implements OnInit {
   filter: 'day' | 'week' | 'month' = 'day';
  appointments: AgendamentoDashboard[] = [];
  filteredAppointments: AgendamentoDashboard[] = [];

  ngOnInit() {
    // Simulação de dados
    this.appointments = [
      {
        id: 1,
        nomeProfissional: 'João',
        nomeServico: 'Corte de Cabelo',
        dataHoraInicio: '2025-07-02 14:00:00',
        dataHoraFim: '2025-07-02 15:30:00',
        status: 'AGENDADO',
      },
      // Mais agendamentos
    ];
    this.updateAppointments();
  }

  updateAppointments() {
    const today = new Date();
    this.filteredAppointments = this.appointments.filter(a => {
      const appointmentDate = new Date(a.dataHoraInicio);
      if (this.filter === 'day') {
        return appointmentDate.toDateString() === today.toDateString();
      } else if (this.filter === 'week') {
        const weekStart = new Date(today.setDate(today.getDate() - today.getDay()));
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekEnd.getDate() + 7);
        return appointmentDate >= weekStart && appointmentDate < weekEnd;
      } else {
        const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
        const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        return appointmentDate >= monthStart && appointmentDate <= monthEnd;
      }
    });
  }

  markAsCompleted(id: number) {
    const appointment = this.appointments.find(a => a.id === id);
    if (appointment) {
      appointment.status = 'CONCLUIDO';
      this.updateAppointments();
    }
  }

  cancelAppointment(id: number) {
    const appointment = this.appointments.find(a => a.id === id);
    if (appointment) {
      appointment.status = 'CANCELADO_PROFISSIONAL';
      this.updateAppointments();
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }

  formatTime(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  }
}

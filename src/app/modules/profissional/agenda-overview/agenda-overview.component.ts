import { Component, OnInit } from '@angular/core';
import { AgendamentoDashboard } from '../../../models/agendamento-dashboard.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-agenda-overview',
  imports: [CommonModule, FormsModule],
  templateUrl: './agenda-overview.component.html',
  styleUrls: ['./agenda-overview.component.css'],
})
export class AgendaOverviewComponent implements OnInit {
  filter: 'day' | 'week' = 'day';
  appointments: AgendamentoDashboard[] = []; // Preenchido por um serviço
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
    this.updateAgenda();
  }

  updateAgenda() {
    const today = new Date();
    this.filteredAppointments = this.appointments.filter((a) => {
      const appointmentDate = new Date(a.dataHoraInicio);
      if (this.filter === 'day') {
        return appointmentDate.toDateString() === today.toDateString();
      } else {
        const weekStart = new Date(
          today.setDate(today.getDate() - today.getDay())
        );
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekEnd.getDate() + 7);
        return appointmentDate >= weekStart && appointmentDate < weekEnd;
      }
    });
  }
}

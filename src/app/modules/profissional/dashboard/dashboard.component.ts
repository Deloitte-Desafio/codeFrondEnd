import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AgendaOverviewComponent } from '../agenda-overview/agenda-overview.component';
import { AgendamentoDetailsComponent } from '../agendamento-details/agendamento-details.component';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, AgendaOverviewComponent, AgendamentoDetailsComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  openServiceManagement() {
    // Lógica para abrir o gerenciador de serviços
  }

  openAvailabilityManagement() {
    // Lógica para abrir o gerenciador de disponibilidade
  }
}

import { Component, OnInit } from '@angular/core';
import { AgendamentoDashboard } from '../../../../models/agendamento-dashboard.module';
import { AgendamentoService } from '../../../../core/services/agendamento/agendamento.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-cliente',
  imports: [CommonModule],
  templateUrl: './dashboard-cliente.component.html',
  styleUrl: './dashboard-cliente.component.css',
})
export class DashboardClienteComponent implements OnInit {
  agendamentos: AgendamentoDashboard[] = [];
  clienteId = 1; // Troque pelo ID do cliente logado

  constructor(private agendamentoService: AgendamentoService) {}

  ngOnInit(): void {
    this.agendamentoService
      .getProximosAgendamentosDoCliente(this.clienteId)
      .subscribe((data) => (this.agendamentos = data));
  }
}

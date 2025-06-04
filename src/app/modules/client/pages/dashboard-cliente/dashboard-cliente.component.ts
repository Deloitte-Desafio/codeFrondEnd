import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AgendamentoDashboard } from '../../../../models/agendamento-dashboard.module';
import { AgendamentoService } from '../../../../core/services/agendamento/agendamento.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard-cliente',
  imports: [CommonModule,RouterModule],
  templateUrl: './dashboard-cliente.component.html',
  styleUrl: './dashboard-cliente.component.css',
})
export class DashboardClienteComponent implements OnInit {
  agendamentos: AgendamentoDashboard[] = [];

  constructor(
    private agendamentoService: AgendamentoService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.agendamentoService
        .getProximosAgendamentosDoCliente()
        .subscribe((data) => (this.agendamentos = data));
    }
  }
}

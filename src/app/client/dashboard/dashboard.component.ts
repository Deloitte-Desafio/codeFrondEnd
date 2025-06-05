import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentService } from '../appointment.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule,RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  appointments: any[] = [];

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit() {
    this.appointmentService.getClientAppointments().subscribe((data) => {
      this.appointments = data;
    });
  }
loadAppointments() {
    this.appointmentService.getClientAppointments().subscribe((data) => {
      this.appointments = data;
    });
  }

  cancelAppointment(appointmentId: number) {
    if (confirm('Tem certeza que deseja cancelar este agendamento?')) {
      this.appointmentService.cancelApointment(appointmentId).subscribe(
        () => {
          alert('Agendamento cancelado com sucesso!');
          this.loadAppointments();
        },
        (error) => {
          alert('Erro ao cancelar agendamento: ' + (error.error?.message || 'Tente novamente.'));
        }
      );
    }
  }
  
}

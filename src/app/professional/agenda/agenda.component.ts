import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../client/appointment.service';

@Component({
  selector: 'app-agenda',
  imports: [],
  templateUrl: './agenda.component.html',
  styleUrl: './agenda.component.css',
})
export class AgendaComponent implements OnInit {
  appointments: any[] = [];

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit() {
    this.loadAppointments('week');
  }

  filterBy(period: string) {
    this.loadAppointments(period);
  }

  loadAppointments(period: string) {
    this.appointmentService
      .getProfessionalAppointments(period)
      .subscribe((data) => {
        this.appointments = data;
      });
  }

  completeAppointment(appointmentId: number) {
    this.appointmentService.markAsCompleted(appointmentId).subscribe(() => {
      this.loadAppointments('week');
    });
  }

  cancelAppointment(appointmentId: number) {
    this.appointmentService.cancelAppointment(appointmentId).subscribe(() => {
      this.loadAppointments('week');
    });
  }
}

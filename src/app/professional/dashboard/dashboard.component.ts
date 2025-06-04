import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../client/appointment.service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  appointments: any[] = [];

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit() {
    this.appointmentService.getProfessionalAppointments().subscribe((data) => {
      this.appointments = data;
    });
  }
}

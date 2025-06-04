import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AppointmentService } from '../appointment.service';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-schedule',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css',
})
export class ScheduleComponent implements OnInit {
  slots: any[] = [];
  professionalId: number;


  constructor(
    private route: ActivatedRoute,
    private appointmentService: AppointmentService,
    private router: Router
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    this.professionalId = id && !isNaN(+id) ? +id : 0;
    if (!this.professionalId) {
      this.router.navigate(['client/explore']);
    }
  }

  ngOnInit() {
    this.appointmentService
      .getAvailableSlots(this.professionalId)
      .subscribe((data) => {
        this.slots = data;
      });
  }

  bookAppointment(slot: any) {
    this.appointmentService
      .createAppointment({ professionalId: this.professionalId, slot })
      .subscribe(() => {
        this.router.navigate(['client/dashboard']);
      });
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-appointment-card',
  imports: [],
  templateUrl: './appointment-card.component.html',
  styleUrl: './appointment-card.component.css',
})
export class AppointmentCardComponent {
  @Input() appointment: any;
  @Input() isProfessional: boolean = false;
  @Output() cancel = new EventEmitter<number>();
  @Output() complete = new EventEmitter<number>();
}

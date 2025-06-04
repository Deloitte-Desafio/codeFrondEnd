import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-availability-picker',
  imports: [],
  templateUrl: './availability-picker.component.html',
  styleUrl: './availability-picker.component.css',
})
export class AvailabilityPickerComponent {
  @Input() days: string[] = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];
  @Output() availabilityUpdated = new EventEmitter<any>();

  updateAvailability(day: string, event: any) {
    this.availabilityUpdated.emit({ day, time: event.target.value });
  }
}

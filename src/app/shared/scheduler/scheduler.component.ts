import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-scheduler',
  imports: [CommonModule],
  templateUrl: './scheduler.component.html',
  styleUrl: './scheduler.component.css',
})
export class SchedulerComponent {
  @Input() slots: any[] = [];
  @Output() slotSelected = new EventEmitter<any>();

  selectSlot(slot: any) {
    this.slotSelected.emit(slot);
  }
}

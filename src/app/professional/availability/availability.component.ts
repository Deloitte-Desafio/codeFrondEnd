import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AvailabilityResponse } from '../../models/disponibilidade.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AvailabilityService } from './availability.service';

@Component({
  selector: 'app-availability',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './availability.component.html',
  styleUrl: './availability.component.css',
})
export class AvailabilityComponent {
  availabilities: AvailabilityResponse[] = [];
  availabilityForm: FormGroup;
  isEditing: boolean = false;
  editingAvailabilityId: number | null = null;
  daysOfWeek = [
    { value: 'SEGUNDA', label: 'Segunda-feira' },
    { value: 'TERCA', label: 'Terça-feira' },
    { value: 'QUARTA', label: 'Quarta-feira' },
    { value: 'QUINTA', label: 'Quinta-feira' },
    { value: 'SEXTA', label: 'Sexta-feira' },
    { value: 'SABADO', label: 'Sábado' },
    { value: 'DOMINGO', label: 'Domingo' },
  ];

  constructor(
    private fb: FormBuilder,
    private availabilityService: AvailabilityService
  ) {
    this.availabilityForm = this.fb.group({
      diaDaSemana: ['', Validators.required],
      horaInicio: ['', Validators.required],
      horaFim: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.loadAvailabilities();
  }

  loadAvailabilities() {
    this.availabilityService.getProfessionalAvailabilities().subscribe({
      next: (data: AvailabilityResponse[]) => {
        this.availabilities = data || [];
      },
      error: (err) => console.error('Erro ao carregar disponibilidades:', err),
    });
  }

  onSubmit() {
    if (this.availabilityForm.valid) {
      const availabilityData = this.availabilityForm.value;
      if (this.isEditing && this.editingAvailabilityId) {
        this.availabilityService
          .updateAvailability(this.editingAvailabilityId, availabilityData)
          .subscribe({
            next: (updated: AvailabilityResponse) => {
              this.availabilities = this.availabilities.map((a) =>
                a.id === updated.id ? updated : a
              );
              this.resetForm();
              alert('Disponibilidade atualizada com sucesso!');
            },
            error: (err) =>
              console.error('Erro ao atualizar disponibilidade:', err),
          });
      } else {
        this.availabilityService
          .createAvailability(availabilityData)
          .subscribe({
            next: (created: AvailabilityResponse) => {
              this.availabilities.push(created);
              this.resetForm();
              alert('Disponibilidade adicionada com sucesso!');
            },
            error: (err) =>
              console.error('Erro ao adicionar disponibilidade:', err),
          });
      }
    }
  }

  editAvailability(availability: AvailabilityResponse) {
    this.isEditing = true;
    this.editingAvailabilityId = availability.id;
    this.availabilityForm.patchValue({
      diaDaSemana: availability.diaDaSemana,
      horaInicio: availability.horaInicio.slice(0, 5),
      horaFim: availability.horaFim.slice(0, 5),
    });
  }

  deleteAvailability(id: number) {
    if (confirm('Tem certeza que deseja excluir esta disponibilidade?')) {
      this.availabilityService.deleteAvailability(id).subscribe({
        next: () => {
          this.availabilities = this.availabilities.filter((a) => a.id !== id);
          alert('Disponibilidade excluída com sucesso!');
        },
        error: (err) => console.error('Erro ao excluir disponibilidade:', err),
      });
    }
  }

  cancelEdit() {
    this.resetForm();
  }

  resetForm() {
    this.availabilityForm.reset();
    this.isEditing = false;
    this.editingAvailabilityId = null;
  }

  formatDay(diaDaSemana: string): string {
    const day = this.daysOfWeek.find((d) => d.value === diaDaSemana);
    return day ? day.label : diaDaSemana;
  }
}

import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ServiceResponse } from '../../models/servico.model';
import { ProfessionalService } from '../professional.service';

@Component({
  selector: 'app-services',
  imports: [CommonModule, RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css',
})
export class ServicesComponent implements OnInit {
  servicos: ServiceResponse[] = [];
  serviceForm: FormGroup;
  isEditing: boolean = false;
  editingServiceId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private professionalService: ProfessionalService
  ) {
    this.serviceForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      descricao: ['', Validators.required],
      duracaoMinutos: [null, [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit() {
    this.loadServices();
  }

  loadServices() {
    this.professionalService.getProfessionalServices().subscribe({
      next: (data: ServiceResponse[]) => {
        console.log(data);
        this.servicos = data || [];
      },
      error: (err) => console.error('Erro ao carregar serviços:', err),
    });
  }

  onSubmit() {
    if (this.serviceForm.valid) {
      const serviceData = this.serviceForm.value;
      if (this.isEditing && this.editingServiceId) {
        this.professionalService
          .updateService(this.editingServiceId, serviceData)
          .subscribe({
            next: (updatedService: ServiceResponse) => {
              this.servicos = this.servicos.map((s) =>
                s.id === updatedService.id ? updatedService : s
              );
              this.resetForm();
              alert('Serviço atualizado com sucesso!');
            },
            error: (err) => console.error('Erro ao atualizar serviço:', err),
          });
      } else {
        this.professionalService.createService(serviceData).subscribe({
          next: (newService: ServiceResponse) => {
            this.servicos.push(newService);
            this.resetForm();
            alert('Serviço adicionado com sucesso!');
          },
          error: (err) => console.error('Erro ao criar serviço:', err),
        });
      }
    }
  }

  editService(service: ServiceResponse) {
    this.isEditing = true;
    this.editingServiceId = service.id;
    this.serviceForm.patchValue({
      nome: service.nome,
      descricao: service.descricao,
      duracaoEmMinutos: service.duracaoMinutos,
    });
  }

  deleteService(serviceId: number) {
    if (confirm('Tem certeza que deseja excluir este serviço?')) {
      this.professionalService.deleteService(serviceId).subscribe({
        next: () => {
          this.servicos = this.servicos.filter((s) => s.id !== serviceId);
          alert('Serviço excluído com sucesso!');
        },
        error: (err) => console.error('Erro ao excluir serviço:', err),
      });
    }
  }

  cancelEdit() {
    this.resetForm();
  }

  resetForm() {
    this.serviceForm.reset({
      nome: '',
      descricao: '',
      duracaoEmMinutos: null,
    });
    this.isEditing = false;
    this.editingServiceId = null;
  }
}

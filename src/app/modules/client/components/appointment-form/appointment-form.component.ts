import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  imports: [CommonModule, FormsModule, ReactiveFormsModule,RouterModule],
  styleUrls: ['./appointment-form.component.css']
})
export class AppointmentFormComponent {
  appointmentForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  professionals = [
    { email: 'prof1@gmail.com', name: 'Carlos Silva', profession: 'Designer' },
    { email: 'prof2@gmail.com', name: 'Ana Souza', profession: 'Desenvolvedor' }
  ];

  clients = [
    { email: 'client1@gmail.com', name: 'João Santos' },
    { email: 'client2@gmail.com', name: 'Maria Oliveira' }
  ];

  serviceTypes = [
    'Consultoria',
    'Design',
    'Desenvolvimento',
    'Manutenção',
    'Outro'
  ];

  constructor(private fb: FormBuilder, private router: Router) {
    this.appointmentForm = this.fb.group({
      clientEmail: ['', Validators.required],
      professionalEmail: ['', Validators.required],
      date: ['', [Validators.required, this.futureDateValidator]],
      time: ['', Validators.required],
      serviceType: ['', Validators.required],
      notes: ['']
    });
  }

 
  futureDateValidator(control: any) {
    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate >= today ? null : { pastDate: true };
  }

  onSubmit() {
    if (this.appointmentForm.valid) {
      
      console.log('Dados do agendamento:', this.appointmentForm.value);
      
      
      this.successMessage = 'Agendamento realizado com sucesso!';
      this.errorMessage = '';
      
      setTimeout(() => {
        this.appointmentForm.reset();
        this.successMessage = '';
         this.router.navigate(['/appointments']); 
      }, 2000);
    }
  }
}
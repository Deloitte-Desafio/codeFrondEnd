import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfessionalService } from '../professional.service';

@Component({
  selector: 'app-services',
  imports: [],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css',
})
export class ServicesComponent implements OnInit {
  serviceForm: FormGroup;
  services: any[] = [];

  constructor(
    private fb: FormBuilder,
    private professionalService: ProfessionalService
  ) {
    this.serviceForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
    });
  }

  ngOnInit() {
    this.professionalService.getServices().subscribe((data) => {
      this.services = data;
    });
  }

  onSubmit() {
    this.professionalService
      .createService(this.serviceForm.value)
      .subscribe((service) => {
        this.services.push(service);
        this.serviceForm.reset();
      });
  }

  deleteService(id: number) {
    this.professionalService.deleteService(id).subscribe(() => {
      this.services = this.services.filter((s) => s.id !== id);
    });
  }
}

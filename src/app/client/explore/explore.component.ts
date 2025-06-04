import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfessionalService } from '../../professional/professional.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-explore',
  imports: [CommonModule,FormsModule, ReactiveFormsModule],
  templateUrl: './explore.component.html',
  styleUrl: './explore.component.css',
})
export class ExploreComponent implements OnInit {
  searchForm: FormGroup;
  profissionais: any[] = [];

  constructor(
    private fb: FormBuilder,
    private professionalService: ProfessionalService,
    private router: Router
  ) {
    this.searchForm = this.fb.group({
      specialty: [''],
      name: [''],
    });
  }

  ngOnInit() {
    this.searchForm.valueChanges.subscribe((filters) => {
      this.professionalService
        .searchProfessionals(filters)
        .subscribe((data) => {
          this.profissionais = data;
        });
    });
  }

  viewAvailability(professionalId: number) {
    this.router.navigate(['client/schedule', professionalId]);
  }
}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../service/auth.service'; 

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule,RouterModule],
  standalone: true
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  showProfessionField: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern('.*@gmail\\.com$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      userType: ['client', Validators.required],
      profession: ['']
    }, { validator: this.passwordMatchValidator });

    this.registerForm.get('userType')?.valueChanges.subscribe(value => {
      this.showProfessionField = value === 'professional' || value === 'both';
      if (this.showProfessionField) {
        this.registerForm.get('profession')?.setValidators([Validators.required]);
      } else {
        this.registerForm.get('profession')?.clearValidators();
      }
      this.registerForm.get('profession')?.updateValueAndValidity();
    });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value 
      ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { confirmPassword, ...userData } = this.registerForm.value;
      
      if (this.authService.register(userData)) {
        this.successMessage = 'Registro realizado com sucesso!';
        this.errorMessage = '';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      } else {
        this.errorMessage = 'Este e-mail já está cadastrado';
        this.successMessage = '';
      }
    }
  }
}
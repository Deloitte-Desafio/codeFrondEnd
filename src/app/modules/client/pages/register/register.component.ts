import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../core/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  standalone: true
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  showProfessionField: boolean = false;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
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
    if (this.registerForm.valid && !this.loading) {
      this.loading = true;
      this.errorMessage = '';
      this.successMessage = '';

      const { confirmPassword, ...userData } = this.registerForm.value;
      
    
      const userToRegister = {
        nome: userData.name,
        email: userData.email,
        senha: userData.password,
        tipoUsuario: this.mapUserType(userData.userType),
        profissao: userData.profession || null
      };

      this.authService.register(userToRegister).subscribe({
        next: (response) => {
          this.loading = false;
          this.successMessage = 'Registro realizado com sucesso!';
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        },
        error: (error) => {
          this.loading = false;
          if (error.includes('409')) {
            this.errorMessage = 'Este e-mail já está cadastrado';
          } else {
            this.errorMessage = 'Erro ao registrar. Por favor, tente novamente.';
          }
          console.error('Erro no registro:', error);
        }
      });
    }
  }

  private mapUserType(frontendType: string): string {
    switch (frontendType) {
      case 'client': return 'CLIENTE';
      case 'professional': return 'PROFISSIONAL';
      default: return 'CLIENTE';
    }
  }
}
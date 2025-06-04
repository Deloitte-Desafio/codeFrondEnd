import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const credentials = {
        email: this.loginForm.value.email,
        senha: this.loginForm.value.password,
      };
      this.authService.login(credentials.email, credentials.senha).subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token); // Armazena o token
          this.authService.getCurrentUser().subscribe({
            next: (userResponse) => {
              console.log('Dados do usuário:', userResponse);
              if (userResponse.tipoUsuario == 'CLIENTE') {
                this.router.navigate(['client/dash']);
              } else {
                this.router.navigate(['professional/dash']);
              }
            },
            error: () => (this.errorMessage = 'Erro ao obter dados do usuário'),
          });
        },
        error: () => (this.errorMessage = 'E-mail ou senha incorretos'),
      });
    }
  }
}

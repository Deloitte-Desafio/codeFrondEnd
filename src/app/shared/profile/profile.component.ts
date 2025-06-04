import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { CommonModule} from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports:[CommonModule,RouterLink],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: any = null;
  errorMessage = '';
  
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe({
      next: (userResponse) => {
        this.user = userResponse;
      },
      error: () => {
        this.errorMessage = 'Erro ao carregar informações do perfil.';
      },
    });
  }

  logout(): void {
    this.authService.logout();
    window.location.href = '/login'; 
  }

  editProfile(){}

  getRandomColor(): string {
  const colors = ['#4a6cf7', '#48bb78', '#9f7aea', '#ed8936', '#e53e3e', '#805ad5'];
  return colors[Math.floor(Math.random() * colors.length)];
}
}

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: any = null;
  errorMessage = '';
  avatarColor: string = this.getRandomColor(); 

  constructor(
    private authService: AuthService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe({
      next: (userResponse) => {
        this.user = userResponse;
       
        this.cdRef.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Erro ao carregar informações do perfil.';
        this.cdRef.detectChanges();
      },
    });
  }

  logout(): void {
    this.authService.logout();
    window.location.href = '/login'; 
  }

  editProfile() {
    
  }

  private getRandomColor(): string {
    const colors = ['#4a6cf7', '#48bb78', '#9f7aea', '#ed8936', '#e53e3e', '#805ad5'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  getBackRoute(): string {
    if (this.user && this.user.tipoUsuario) {
      return this.user.tipoUsuario === 'CLIENTE' ? '/client/dash' : '/professional/dash';
    }
    return '/';
  }
}
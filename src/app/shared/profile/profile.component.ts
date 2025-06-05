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
  avatarColor: string = this.getRandomColor(); // Inicializa direto na propriedade

  constructor(
    private authService: AuthService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe({
      next: (userResponse) => {
        this.user = userResponse;
        // Se precisar mudar a cor após carregar o usuário:
        // this.avatarColor = this.getUserSpecificColor(); 
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
    // Lógica de edição de perfil aqui
  }

  private getRandomColor(): string {
    const colors = ['#4a6cf7', '#48bb78', '#9f7aea', '#ed8936', '#e53e3e', '#805ad5'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  /*
  // Opcional: cor baseada no usuário (consistente)
  private getUserSpecificColor(): string {
    if (!this.user) return this.getRandomColor();
    const hash = this.user.id ? this.hashCode(this.user.id) : 0;
    const colors = ['#4a6cf7', '#48bb78', '#9f7aea', '#ed8936', '#e53e3e', '#805ad5'];
    return colors[Math.abs(hash) % colors.length];
  }

  private hashCode(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
  }
  */

  getBackRoute(): string {
    if (this.user && this.user.tipoUsuario) {
      return this.user.tipoUsuario === 'CLIENTE' ? '/client/dash' : '/professional/dash';
    }
    return '/';
  }
}
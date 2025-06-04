import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { CommonModule} from '@angular/common';

@Component({
  selector: 'app-profile',
  imports:[CommonModule],
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
    window.location.href = '/login'; // Redirecionamento direto (sem precisar importar Router)
  }

  editProfile(){}
}

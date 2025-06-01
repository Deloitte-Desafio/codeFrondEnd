import { Component } from '@angular/core';
import { User } from '../../models/user/user.model';
import { UserService } from '../../services/User/user.service';

@Component({
  selector: 'app-perfil',
  imports: [],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css',
})
export class PerfilComponent {
  user?: User;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    const userId = 1; // Lógica real aqui (ex: rota ou login)
    this.userService.getUserById(userId).subscribe((data) => {
      this.user = data;
    });
  }
}

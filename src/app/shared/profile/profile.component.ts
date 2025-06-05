import { Component, OnInit } from '@angular/core';
import { UserResponse } from '../../models/user.model';
import { UserService } from './user.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  user?: UserResponse;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUserById().subscribe({
      next: (data) => {
        this.user = data;
      },
      error: (err) => {
        console.error('Erro ao carregar perfil:', err);
      },
    });
  }
}

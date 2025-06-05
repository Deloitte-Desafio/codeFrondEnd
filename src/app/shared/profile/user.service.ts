import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserResponse } from '../../models/user.model';
import { Observable, switchMap } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8080/users';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getUserById(): Observable<UserResponse> {
    return this.authService.getCurrentUser().pipe(
      switchMap((user) => {
        const userId = user.id;
        return this.http.get<UserResponse>(`${this.apiUrl}/${userId}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
      })
    );
  }
}

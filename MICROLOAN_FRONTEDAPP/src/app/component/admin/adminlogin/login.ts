import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService, LoginRequest } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  username = '';
  password = '';
  message = '';
  isSubmitting = false;

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.isSubmitting = true;
    const data: LoginRequest = { email: this.username, password: this.password };
    this.authService.login(data).subscribe({
      next: (res) => {
        // Backend returns plain text; set minimal state and route to admin dashboard
        this.authService.setUserData({ username: this.username, role: 'admin', token: 'dummy-token' });
        this.isSubmitting = false;
        this.router.navigate(['/admin/dashboard']);
      },
      error: (err: any) => {
        this.isSubmitting = false;
        this.message = (typeof err?.error === 'string' && err.status === 401) ? err.error : 'Login failed';
      }
    });
  }
}

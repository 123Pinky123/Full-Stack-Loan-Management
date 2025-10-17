import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService, LoginRequest } from '../../service/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  loginForm: FormGroup;
  message = '';
  isSubmitting = false;

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  togglePasswordVisibility(input: HTMLInputElement) {
    input.type = input.type === 'password' ? 'text' : 'password';
  }

  onSubmit() {
    if (this.loginForm.invalid) return;
    this.isSubmitting = true;
    const { email, password } = this.loginForm.value as { email: string; password: string };
    const data: LoginRequest = { email, password };
    this.authService.login(data).subscribe({
      next: (res) => {
        // Backend returns plain text on success; set minimal client user state
        this.authService.setUserData({ username: email, role: 'customer', token: 'dummy-token' });
        this.isSubmitting = false;
        this.message = '';
        // Navigate back to landing page as requested
        this.router.navigate(['/landingpage']);
      },
      error: (err: any) => {
        this.isSubmitting = false;
        this.message = (typeof err?.error === 'string' && err.status === 401) ? err.error : 'Login failed';
      }
    });
  }
}

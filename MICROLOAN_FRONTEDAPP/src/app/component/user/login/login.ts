

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class login {

  constructor(private router: Router) {}

  login(usernameInput: HTMLInputElement, emailInput: HTMLInputElement, passwordInput: HTMLInputElement) {
    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    // Simple demo validation
    if (username && email && password) {
      alert('Login successful!');
      this.router.navigate(['website/userdashboard']); // Redirect
    } else {
      alert('Please enter valid details!');
    }
  }

  togglePassword(passwordInput: HTMLInputElement, toggleBtn: HTMLElement) {
    if(passwordInput.type === 'password') {
      passwordInput.type = 'text';
      toggleBtn.textContent = '🙈';
    } else {
      passwordInput.type = 'password';
      toggleBtn.textContent = '👁️';
    }
  }
}

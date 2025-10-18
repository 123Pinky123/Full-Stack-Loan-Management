import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminUserService, AdminUser } from '../../service/admin-user.service'; // fixed import

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './users.html',
  styleUrls: ['./users.css'] // corrected property
})
export class Users {
  creating: boolean = false;
  isSubmitting: boolean = false;
  isSuccess: boolean = false;
  message: string = '';
  generatedPassword: string = '';

  newUser: Partial<AdminUser> = {
    username: '',
    email: '',
    phoneNumber: '',
    role: '',
    status: 'active'
  };

  errors: any = {};

  constructor(private adminUserService: AdminUserService) {}

  toggleCreate() {
    this.creating = !this.creating;
    this.message = '';
    this.errors = {};
    this.generatedPassword = '';
    if (!this.creating) {
      this.resetForm();
    }
  }

  generatePassword() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    this.generatedPassword = password;
  }

  validateForm(): boolean {
    this.errors = {};
    let isValid = true;

    if (!this.newUser.username?.trim()) {
      this.errors.username = 'Username is required';
      isValid = false;
    }

    if (!this.newUser.email?.trim()) {
      this.errors.email = 'Email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.newUser.email)) {
      this.errors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!this.newUser.phoneNumber?.trim()) {
      this.errors.phoneNumber = 'Phone number is required';
      isValid = false;
    }

    if (!this.newUser.role) {
      this.errors.role = 'Please select a role';
      isValid = false;
    }

    return isValid;
  }

  createUser() {
    if (!this.validateForm()) return;

    this.isSubmitting = true;
    this.message = '';

    if (!this.generatedPassword) {
      this.generatePassword();
    }

    const userData: AdminUser = {
      ...this.newUser,
      temporaryPassword: this.generatedPassword,
      sendWelcomeEmail: true
    } as AdminUser;

    this.adminUserService.create(userData).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        this.isSuccess = true;
        this.message = `User created successfully! Temporary password: ${this.generatedPassword}. Welcome email sent.`;
        this.creating = false;
        this.resetForm();
        // Refresh user list if needed
      },
      error: (err) => {
        this.isSubmitting = false;
        this.isSuccess = false;
        this.message = (err && (err.error?.message || err.error)) || 'Failed to create user.';
      }
    });
  }

  resetForm() {
    this.newUser = {
      username: '',
      email: '',
      phoneNumber: '',
      role: '',
      status: 'active'
    };
    this.generatedPassword = '';
    this.errors = {};
    this.message = '';
  }
}

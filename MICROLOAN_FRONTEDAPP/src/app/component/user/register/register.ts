/*import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../service/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  phoneNumber: string;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {
  registrationForm: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.registrationForm = this.fb.group(
      {
        fullname: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirm: ['', [Validators.required]]
      },
      { validators: this.passwordsMatchValidator }
    );
  }

  private passwordsMatchValidator = (group: AbstractControl): ValidationErrors | null => {
    const password = group.get('password')?.value;
    const confirm = group.get('confirm')?.value;
    return password && confirm && password !== confirm ? { mismatch: true } : null;
  };

  togglePasswordVisibility(input: HTMLInputElement) {
    input.type = input.type === 'password' ? 'text' : 'password';
  }

  onSubmit() {
    if (this.registrationForm.invalid) return;
    this.loading = true;
    const { fullname, email, phone, password } = this.registrationForm.value as {
      fullname: string; email: string; phone: string; password: string;
    };
    const data: RegisterRequest = {
      username: fullname,
      email,
      password,
      phoneNumber: phone
    };

    this.http.post('https://localhost:8080/api/auth/signup', data).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/user/login']);
      },
      error: (err: any) => {
        this.loading = false;
        this.errorMessage = err?.error?.message || 'Registration failed';
      }
    });
  }
}*/





import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../service/auth.service'; // Adjust path if needed

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  phoneNumber: string;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {
  registrationForm: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.registrationForm = this.fb.group(
      {
        fullname: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirm: ['', [Validators.required]]
      },
      { validators: this.passwordsMatchValidator }
    );
  }

  private passwordsMatchValidator = (group: AbstractControl): ValidationErrors | null => {
    const password = group.get('password')?.value;
    const confirm = group.get('confirm')?.value;
    return password && confirm && password !== confirm ? { mismatch: true } : null;
  };

  togglePasswordVisibility(input: HTMLInputElement) {
    input.type = input.type === 'password' ? 'text' : 'password';
  }

  onSubmit() {
    if (this.registrationForm.invalid) return;
    this.loading = true;

    const { fullname, email, phone, password } = this.registrationForm.value as {
      fullname: string;
      email: string;
      phone: string;
      password: string;
    };

    const data: RegisterRequest = {
      username: fullname,
      email,
      password,
      phoneNumber: phone
    };

    // ✅ NOTE: use http (not https) unless you have SSL configured on backend
    this.http.post('http://localhost:8080/api/auth/signup', data).subscribe({
      next: () => {
        this.loading = false;
        alert('Registration successful!');
        this.router.navigate(['/user/login']);
      },
      error: (err: any) => {
        this.loading = false;
        this.errorMessage = err?.error?.message || 'Registration failed';
        alert(this.errorMessage);
      }
    });
  }
}


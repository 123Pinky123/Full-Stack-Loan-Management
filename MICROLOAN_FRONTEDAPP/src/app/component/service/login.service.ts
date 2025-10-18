// src/app/service/login.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  // ✅ Hard-coded API URLs
  private loginUrl = 'http://localhost:35729/api/auth/login';
  private loanUrl = 'http://localhost:35729/api/loans'; // ✅ added for createLoan()

  constructor(private http: HttpClient) {}

  // ✅ existing login method
  login(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.loginUrl, data);
  }

  // ✅ logout method
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }

  // ✅ added createLoan() method
  createLoan(loan: any): Observable<any> {
    return this.http.post<any>(this.loanUrl, loan);
  }
}

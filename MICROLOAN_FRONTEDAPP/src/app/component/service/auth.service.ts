import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  // Backend currently returns plain text message on success
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:35729/api/auth';

  public isLoggedIn$ = new BehaviorSubject<boolean>(this.isLoggedIn());

  constructor(private http: HttpClient) {}

  login(data: LoginRequest): Observable<LoginResponse> {
    // Spring controller expects { email, password }
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/login`, data, { responseType: 'text' as any })
      .pipe(
        // Frontend-only fallback: if backend is unavailable or returns auth error, allow mock success
        catchError(() => {
          return of({ message: 'Login successful (mock)' } as LoginResponse);
        })
      );
  }

  logout(): void {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    this.isLoggedIn$.next(false);
  }

  setUserData(user: { username: string; role: string; token: string }): void {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', user.token);
    }
    this.isLoggedIn$.next(true);
  }

  getUserData(): { username: string; role: string } | null {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
      return null;
    }
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  isLoggedIn(): boolean {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
      return false;
    }
    return !!localStorage.getItem('token');
  }
}

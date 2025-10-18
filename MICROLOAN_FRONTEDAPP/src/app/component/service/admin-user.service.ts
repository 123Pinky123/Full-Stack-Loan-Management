import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApplicationService } from './application.service'; 

@Injectable({
  providedIn: 'root'
})
export class AdminUserService {
  // Hard-coded API URL instead of environment
  private apiUrl = 'http://localhost:8080/api/adminusers';

  constructor(private http: HttpClient) {}

  getAll(): Observable<AdminUser[]> {
    return this.http.get<AdminUser[]>(this.apiUrl);
  }

  getById(id: number): Observable<AdminUser> {
    return this.http.get<AdminUser>(`${this.apiUrl}/${id}`);
  }

  create(adminUser: AdminUser): Observable<AdminUser> {
    return this.http.post<AdminUser>(this.apiUrl, adminUser);
  }

  update(id: number, adminUser: AdminUser): Observable<AdminUser> {
    return this.http.put<AdminUser>(`${this.apiUrl}/${id}`, adminUser);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

// AdminUser interface with all required fields
export interface AdminUser {
  id?: number;
  username: string;
  email: string;
  phoneNumber: string;
  role: 'admin' | 'loan_officer' | 'customer' | '';
  status: 'active' | 'inactive' | 'suspended';
  temporaryPassword?: string;
  sendWelcomeEmail?: boolean;
  createdAt?: Date;
  lastLogin?: Date;
}

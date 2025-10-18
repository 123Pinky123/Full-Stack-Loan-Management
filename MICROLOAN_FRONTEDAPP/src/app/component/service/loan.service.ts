// src/app/component/service/loan.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// ✅ Main Loan interface (used for data returned from backend)
export interface Loan {
  id: number;
  customerId: number;
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  startDate: string;
  status: string;
}

// ✅ DTO used when creating or updating a loan (no `id`)
export type CreateLoanDto = Omit<Loan, 'id'>;

@Injectable({
  providedIn: 'root',
})
export class LoanService {
  // 🔧 Adjust this URL to match your backend
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // ✅ Fetch all loans
  getLoans(): Observable<Loan[]> {
    return this.http.get<Loan[]>(`${this.apiUrl}/loans`);
  }

  // ✅ Create a new loan (no id needed)
  createLoan(loan: CreateLoanDto): Observable<Loan> {
    return this.http.post<Loan>(`${this.apiUrl}/loans`, loan);
  }

  // ✅ Update an existing loan by ID
  updateLoan(id: number, loan: CreateLoanDto): Observable<Loan> {
    return this.http.put<Loan>(`${this.apiUrl}/loans/${id}`, loan);
  }

  // ✅ Delete a loan by ID
  deleteLoan(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/loans/${id}`);
  }

  // ✅ Optional: alias for compatibility with components expecting getAll()
  getAll(): Observable<Loan[]> {
    return this.getLoans();
  }
}

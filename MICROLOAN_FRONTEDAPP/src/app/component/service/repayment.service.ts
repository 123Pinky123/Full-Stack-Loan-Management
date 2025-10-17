import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Repayment {
  id?: number;
  applicationId: number;
  amountPaid: number;
  paymentDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class RepaymentService {
  // Hard-coded API URL instead of environment
  private apiUrl = 'http://localhost:8080/api/repayments';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Repayment[]> {
    return this.http.get<Repayment[]>(this.apiUrl);
  }

  getById(id: number): Observable<Repayment> {
    return this.http.get<Repayment>(`${this.apiUrl}/${id}`);
  }

  create(repayment: Repayment): Observable<Repayment> {
    return this.http.post<Repayment>(this.apiUrl, repayment);
  }

  update(id: number, repayment: Repayment): Observable<Repayment> {
    return this.http.put<Repayment>(`${this.apiUrl}/${id}`, repayment);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

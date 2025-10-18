export interface LoanModel {
  id?: number;
  customerId: string;
  loanAmount: number;
  interestRate: number;
  loanTerm: number; // Duration in months (12 months)
  startDate: string; // ISO date string
  dueDate: string; // ISO date string
  repaymentSchedule: 'MONTHLY' | 'WEEKLY';
  initialBalance: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'ACTIVE' | 'COMPLETED' | 'DEFAULTED';
  createdBy: string;
  createdAt: string; // ISO date string
}

export interface LoanCreateRequest {
  customerId: string;
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  startDate: string;
  repaymentSchedule: 'MONTHLY' | 'WEEKLY';
  createdBy: string;
}

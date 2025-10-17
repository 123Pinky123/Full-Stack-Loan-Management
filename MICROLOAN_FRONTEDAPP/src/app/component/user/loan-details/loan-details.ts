import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

interface Loan {
  id: number;
  name: string;
  accountNumber: string;
  amount: number;
  outstanding: number;
  interestRate: number; // New field
  tenure: number; // New field (in months)
  emiAmount: number; // New field
}

interface Repayment {
  id: number;
  loanId: number;
  dueDate: string;
  amountDue: number;
  status: 'Paid' | 'Pending' | 'Overdue' | 'Overdue-30' | 'Overdue-60' | 'Overdue-90';
  paymentDate?: string;
  amountPaid?: number;
  balance?: number;
  daysPastDue?: number;
  penaltyAmount?: number;
  principalComponent?: number; // New field
  interestComponent?: number; // New field
}

@Component({
  selector: 'app-loan-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './loan-details.html',
  styleUrl: './loan-details.css'
})
export class LoanDetailsComponent implements OnInit {
  loanId: number | null = null;
  loan: Loan | undefined;
  amortizationSchedule: Repayment[] = [];
  nextDueDate: string = '';
  remainingPrincipal: number = 0;

  // Mock Data (will eventually come from a service)
  private allLoans: Loan[] = [
    { id: 1, name: 'Personal Loan', accountNumber: 'PL-12345', amount: 50000, outstanding: 25000, interestRate: 10, tenure: 24, emiAmount: 2300 },
    { id: 2, name: 'Home Loan', accountNumber: 'HL-67890', amount: 2000000, outstanding: 1500000, interestRate: 8, tenure: 240, emiAmount: 16700 },
    { id: 3, name: 'Education Loan', accountNumber: 'EL-11223', amount: 100000, outstanding: 30000, interestRate: 12, tenure: 60, emiAmount: 2200 }
  ];

  private allRepayments: Repayment[] = [
    { id: 1, loanId: 1, dueDate: '2024-09-20', amountDue: 2500, status: 'Paid', paymentDate: '2024-09-18', amountPaid: 2500, balance: 0, principalComponent: 2000, interestComponent: 500 },
    { id: 2, loanId: 1, dueDate: '2024-10-20', amountDue: 2500, status: 'Pending', balance: 2500, principalComponent: 2000, interestComponent: 500 },
    { id: 3, loanId: 2, dueDate: '2024-09-01', amountDue: 15000, status: 'Overdue', balance: 15000, principalComponent: 10000, interestComponent: 5000 },
    { id: 4, loanId: 2, dueDate: '2024-10-01', amountDue: 15000, status: 'Pending', balance: 15000, principalComponent: 10000, interestComponent: 5000 },
    { id: 5, loanId: 3, dueDate: '2024-09-15', amountDue: 3000, status: 'Paid', paymentDate: '2024-09-14', amountPaid: 3000, balance: 0, principalComponent: 2500, interestComponent: 500 },
    { id: 6, loanId: 3, dueDate: '2024-10-15', amountDue: 3000, status: 'Pending', balance: 3000, principalComponent: 2500, interestComponent: 500 }
  ];

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.loanId = Number(params.get('id'));
      this.loadLoanDetails();
    });
  }

  loadLoanDetails() {
    if (this.loanId) {
      this.loan = this.allLoans.find(l => l.id === this.loanId);
      this.amortizationSchedule = this.allRepayments.filter(r => r.loanId === this.loanId);

      if (this.loan) {
        // Calculate daysPastDue and penaltyAmount for amortization schedule
        this.amortizationSchedule.forEach(repayment => {
          if (repayment.status !== 'Paid') {
            const today = new Date();
            const dueDate = new Date(repayment.dueDate);
            const diffTime = Math.abs(today.getTime() - dueDate.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (today > dueDate) {
              repayment.daysPastDue = diffDays;
              repayment.penaltyAmount = repayment.amountDue * 0.01 * repayment.daysPastDue; // 1% penalty per day
              if (repayment.daysPastDue <= 30) {
                repayment.status = 'Overdue';
              } else if (repayment.daysPastDue > 30 && repayment.daysPastDue <= 60) {
                repayment.status = 'Overdue-30';
              } else if (repayment.daysPastDue > 60 && repayment.daysPastDue <= 90) {
                repayment.status = 'Overdue-60';
              } else {
                repayment.status = 'Overdue-90';
              }
            }
          }
        });

        // Calculate remaining principal (simple sum of outstanding balances for now)
        this.remainingPrincipal = this.amortizationSchedule
          .filter(rep => rep.status !== 'Paid' && rep.balance !== undefined)
          .reduce((sum, rep) => sum + (rep.balance || 0), 0);

        // Find next due date
        const upcomingRepayments = this.amortizationSchedule.filter(rep => {
          const today = new Date();
          const dueDate = new Date(rep.dueDate);
          return (rep.status !== 'Paid') && dueDate >= today;
        }).sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

        if (upcomingRepayments.length > 0) {
          this.nextDueDate = upcomingRepayments[0].dueDate;
        }
      }
    }
  }

  exportScheduleAsCsv() {
    alert('Exporting loan schedule as CSV...');
    // Implement CSV export logic here
  }

  exportScheduleAsPdf() {
    alert('Exporting loan schedule as PDF...');
    // Implement PDF export logic here
  }

  goBack() {
    this.router.navigate(['/user/repayments']);
  }
}

// src/app/component/admin/loans/loans.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoanService } from '../../service/loan.service';

interface Loan {
  id: number;
  customerId: number;
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  startDate: string;
  status: string;
}

// Payload for create/update (no id)
type CreateLoanDto = Omit<Loan, 'id'>;

// Form model (allows nulls while user types)
type CreateLoanForm = {
  customerId: number | null;
  loanAmount: number | null;
  interestRate: number | null;
  loanTerm: number | null;
  startDate: string;
  status: string;
};

interface LoanErrors {
  customerId?: string;
  loanAmount?: string;
  interestRate?: string;
  loanTerm?: string;
  startDate?: string;
  status?: string;
}

@Component({
  selector: 'app-loans',
  standalone: true,
  templateUrl: './loans.html',
  styleUrls: ['./loans.css'],
  imports: [CommonModule, FormsModule],
})
export class LoansComponent implements OnInit {
  loans: Loan[] = [];
  filteredLoans: Loan[] = [];
  searchQuery = '';
  creating = false;
  isSubmitting = false;

  message: string = '';
  isSuccess: boolean = false;

  errors: LoanErrors = {};

  // Use the form model with null-able fields
  newLoan: CreateLoanForm = {
    customerId: null,
    loanAmount: null,
    interestRate: null,
    loanTerm: null,
    startDate: '',
    status: 'PENDING',
  };

  editingLoan: Loan | null = null; // edit mode

  constructor(private loanService: LoanService) {}

  ngOnInit(): void {
    this.fetchLoans();
  }

  fetchLoans(): void {
    this.loanService.getLoans().subscribe((data) => {
      this.loans = (data ?? []) as Loan[];
      this.filteredLoans = this.loans;
    });
  }

  onSearchChange(): void {
    const query = this.searchQuery.trim().toLowerCase();
    this.filteredLoans = query
      ? this.loans.filter((loan) =>
          Object.values(loan).some((v) => String(v).toLowerCase().includes(query))
        )
      : this.loans;
  }

  toggleCreate(): void {
    this.creating = !this.creating;
    this.editingLoan = null; // reset edit mode
  }

  // Create a new loan
  createLoan(): void {
    this.errors = {};
    this.isSubmitting = true;
    this.message = '';
    this.isSuccess = false;

    // basic validation
    if (!this.newLoan.customerId) this.errors.customerId = 'Customer ID is required';
    if (!this.newLoan.loanAmount) this.errors.loanAmount = 'Loan amount is required';
    if (!this.newLoan.interestRate) this.errors.interestRate = 'Interest rate is required';
    if (!this.newLoan.loanTerm) this.errors.loanTerm = 'Loan term is required';
    if (!this.newLoan.startDate) this.errors.startDate = 'Start date is required';

    if (Object.keys(this.errors).length > 0) {
      this.isSubmitting = false;
      this.message = 'Please fill all required fields.';
      this.isSuccess = false;
      return;
    }

    // Build a type-safe payload (no nulls, no id)
    const payload: CreateLoanDto = {
      customerId: this.newLoan.customerId!,   // safe after validation
      loanAmount: this.newLoan.loanAmount!,
      interestRate: this.newLoan.interestRate!,
      loanTerm: this.newLoan.loanTerm!,
      startDate: this.newLoan.startDate,
      status: this.newLoan.status,
    };

    this.loanService.createLoan(payload).subscribe({
      next: (res) => {
        this.isSubmitting = false;
        this.creating = false;
        this.message = 'Loan created successfully!';
        this.isSuccess = true;

        // reset form
        this.newLoan = {
          customerId: null,
          loanAmount: null,
          interestRate: null,
          loanTerm: null,
          startDate: '',
          status: 'PENDING',
        };

        this.fetchLoans();
      },
      error: (err) => {
        console.error('Error creating loan:', err);
        this.isSubmitting = false;
        this.message = 'Failed to create loan.';
        this.isSuccess = false;
      },
    });
  }

  // Select a loan for edit
  selectForEdit(loan: Loan): void {
    this.editingLoan = { ...loan }; // copy
    this.creating = true; // reuse the form
    this.newLoan = {
      customerId: loan.customerId,
      loanAmount: loan.loanAmount,
      interestRate: loan.interestRate,
      loanTerm: loan.loanTerm,
      startDate: loan.startDate,
      status: loan.status,
    };
  }

  // Update an existing loan
  updateLoan(): void {
    if (!this.editingLoan) return;

    this.isSubmitting = true;
    this.message = '';
    this.isSuccess = false;

    // Build payload from form
    const payload: CreateLoanDto = {
      customerId: this.newLoan.customerId!,
      loanAmount: this.newLoan.loanAmount!,
      interestRate: this.newLoan.interestRate!,
      loanTerm: this.newLoan.loanTerm!,
      startDate: this.newLoan.startDate,
      status: this.newLoan.status,
    };

    this.loanService.updateLoan(this.editingLoan.id, payload).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.creating = false;
        this.editingLoan = null;
        this.message = 'Loan updated successfully!';
        this.isSuccess = true;
        this.fetchLoans();
      },
      error: (err) => {
        console.error('Error updating loan:', err);
        this.isSubmitting = false;
        this.message = 'Failed to update loan.';
        this.isSuccess = false;
      },
    });
  }

  // Delete a loan
  deleteLoan(loan: Loan): void {
    if (!confirm(`Are you sure you want to delete loan #${loan.id}?`)) return;

    this.loanService.deleteLoan(loan.id).subscribe({
      next: () => {
        this.message = `Loan #${loan.id} deleted successfully!`;
        this.isSuccess = true;
        this.fetchLoans();
      },
      error: (err) => {
        console.error('Error deleting loan:', err);
        this.message = 'Failed to delete loan.';
        this.isSuccess = false;
      },
    });
  }
}

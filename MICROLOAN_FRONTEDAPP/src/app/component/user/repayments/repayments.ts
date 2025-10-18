import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

interface Loan {
  id: number;
  name: string;
  accountNumber: string; // Added account number for unique ID
  amount: number;
  outstanding: number;
  interestRate: number;
  tenure: number;
  emiAmount: number;
}

interface Repayment {
  id: number;
  loanId: number;
  dueDate: string;
  amountDue: number;
  status: 'Paid' | 'Pending' | 'Overdue' | 'Overdue-30' | 'Overdue-60' | 'Overdue-90'; // Added more specific overdue statuses
  paymentDate?: string;
  amountPaid?: number;
  balance?: number; // Added balance field
  daysPastDue?: number; // New field for days past due
  penaltyAmount?: number; // New field for penalty amount
  principalComponent?: number; // New field
  interestComponent?: number; // New field
}

@Component({
  selector: 'app-repayments',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './repayments.html',
  styleUrl: './repayments.css'
})
export class Repayments implements OnInit {
  repaymentForm: FormGroup;
  loans: Loan[] = [];
  repayments: Repayment[] = [];
  filteredLoans: Loan[] = [];
  repaymentSummary = {
    totalOutstanding: 0,
    upcomingEMI: 0,
    upcomingEMIDate: '',
    totalPaid: 0
  };

  footerContent = {
    terms: {
      title: 'Terms and Conditions',
      text: `These terms and conditions outline the rules and regulations for the use of MicroLoan's Website.\r\n      By accessing this website we assume you accept these terms and conditions. Do not continue to use MicroLoan if you do not agree to take all of the terms and conditions stated on this page. The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: "Client", "You" and "Your" refers to you, the person log on this website and compliant to the Company's terms and conditions. "The Company", "Ourselves", "We", "Our" and "Us", refers to our Company. "Party", "Parties", or "Us", refers to both the Client and ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client's needs in respect of provision of the Company's stated services, in accordance with and subject to, prevailing law of Netherlands. Any use of the above terminology or other words in the singular, plural, capitalization and/or he/she or they, are taken as interchangeable and therefore as referring to same.`
    },
    privacy: {
      title: 'Privacy Policy',
      text: `At MicroLoan, accessible from www.microloan.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by MicroLoan and how we use it. If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us. This Privacy Policy applies only to our online activities and is valid for visitors to our website with regard to the information that they shared and/or collect in MicroLoan. This policy is not applicable to any information collected offline or via channels other than this website. Consent By using our website, you hereby consent to our Privacy Policy and agree to its terms.`
    },
    contact: {
      title: 'Contact Us',
      text: `If you have any questions about our Loan Products, your Applications, Repayments, or any other inquiries, please feel free to reach out to us. You can contact our support team via:\r\n      Email: support@microloan.com\r\n      Phone: +91 98765 43210\r\n      Address: MicroLoan, 123 Financial District, Mumbai, India`
    }
  };

  selectedFooterContent: { title: string; text: string } | null = null;

  constructor(private fb: FormBuilder, private router: Router) {
    this.repaymentForm = this.fb.group({
      loanId: [null, Validators.required],
      amount: ['', [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.loadMockData();
    this.filterLoansForPayment();
    this.calculateRepaymentSummary();
  }

  showFooterContent(contentType: 'terms' | 'privacy' | 'contact') {
    this.selectedFooterContent = this.footerContent[contentType];
  }

  hideFooterContent() {
    this.selectedFooterContent = null;
  }

  showHowCalculated() {
    alert('This would show a detailed breakdown of how the outstanding, next EMI, or total paid amounts are calculated.');
    // In a real application, you would open a modal or navigate to a dedicated page.
  }

  loadMockData() {
    this.loans = [
      { id: 1, name: 'Personal Loan', accountNumber: 'PL-12345', amount: 50000, outstanding: 25000, interestRate: 10, tenure: 24, emiAmount: 2300 },
      { id: 2, name: 'Home Loan', accountNumber: 'HL-67890', amount: 2000000, outstanding: 1500000, interestRate: 8, tenure: 240, emiAmount: 16700 },
      { id: 3, name: 'Education Loan', accountNumber: 'EL-11223', amount: 100000, outstanding: 30000, interestRate: 12, tenure: 60, emiAmount: 2200 }
    ];

    this.repayments = [
      { id: 1, loanId: 1, dueDate: '2024-09-20', amountDue: 2500, status: 'Paid', paymentDate: '2024-09-18', amountPaid: 2500, balance: 0, principalComponent: 2000, interestComponent: 500 },
      { id: 2, loanId: 1, dueDate: '2024-10-20', amountDue: 2500, status: 'Pending', balance: 2500, principalComponent: 2000, interestComponent: 500 },
      { id: 3, loanId: 2, dueDate: '2024-09-01', amountDue: 15000, status: 'Overdue', balance: 15000, principalComponent: 10000, interestComponent: 5000 },
      { id: 4, loanId: 2, dueDate: '2024-10-01', amountDue: 15000, status: 'Pending', balance: 15000, principalComponent: 10000, interestComponent: 5000 },
      { id: 5, loanId: 3, dueDate: '2024-09-15', amountDue: 3000, status: 'Paid', paymentDate: '2024-09-14', amountPaid: 3000, balance: 0, principalComponent: 2500, interestComponent: 500 },
      { id: 6, loanId: 3, dueDate: '2024-10-15', amountDue: 3000, status: 'Pending', balance: 3000, principalComponent: 2500, interestComponent: 500 }
    ];

    this.repayments.forEach(repayment => {
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
  }

  filterLoansForPayment() {
    const loanIdsWithUpcomingOrOverdue = new Set<number>();
    const today = new Date();
    this.repayments.forEach(repayment => {
      const dueDate = new Date(repayment.dueDate);
      if ((repayment.status !== 'Paid') && dueDate >= today) {
        loanIdsWithUpcomingOrOverdue.add(repayment.loanId);
      }
    });
    this.filteredLoans = this.loans.filter(loan => loanIdsWithUpcomingOrOverdue.has(loan.id));
  }

  calculateRepaymentSummary() {
    this.repaymentSummary.totalOutstanding = this.loans.reduce((sum, loan) => sum + loan.outstanding, 0);

    const nextPayment = this.repayments.find(rep => {
      const today = new Date();
      const dueDate = new Date(rep.dueDate);
      return (rep.status !== 'Paid') && dueDate >= today;
    });

    this.repaymentSummary.upcomingEMI = nextPayment ? nextPayment.amountDue + (nextPayment.penaltyAmount || 0) : 0;
    this.repaymentSummary.upcomingEMIDate = nextPayment ? nextPayment.dueDate : '';

    this.repaymentSummary.totalPaid = this.repayments
      .filter(rep => rep.status === 'Paid' && rep.amountPaid)
      .reduce((sum, rep) => sum + (rep.amountPaid || 0), 0);
  }

  getLoanName(loanId: number): string {
    const loan = this.loans.find(loan => loan.id === loanId);
    return loan ? `${loan.name} - #${loan.accountNumber}` : 'N/A';
  }

  makePayment() {
    if (this.repaymentForm.valid) {
      const { loanId, amount } = this.repaymentForm.value;
      const loan = this.loans.find(l => l.id === loanId);

      if (loan) {
        alert(`Payment of ₹${amount} for ${loan.name} initiated successfully!`);

        const pendingOverdueRepayments = this.repayments
          .filter(rep => rep.loanId === loanId && rep.status !== 'Paid')
          .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

        let remainingAmount = amount;

        for (const repaymentToUpdate of pendingOverdueRepayments) {
          if (remainingAmount <= 0) break;

          const totalDue = repaymentToUpdate.amountDue + (repaymentToUpdate.penaltyAmount || 0);

          if (remainingAmount >= totalDue) {
            repaymentToUpdate.status = 'Paid';
            repaymentToUpdate.paymentDate = new Date().toISOString().split('T')[0];
            repaymentToUpdate.amountPaid = (repaymentToUpdate.amountPaid || 0) + totalDue;
            repaymentToUpdate.balance = 0;
            repaymentToUpdate.daysPastDue = undefined;
            repaymentToUpdate.penaltyAmount = undefined;
            remainingAmount -= totalDue;
          } else if (remainingAmount > 0) {
            repaymentToUpdate.amountPaid = (repaymentToUpdate.amountPaid || 0) + remainingAmount;
            repaymentToUpdate.balance = totalDue - remainingAmount;
            remainingAmount = 0;
          }
        }

        loan.outstanding -= (amount - remainingAmount);
        this.calculateRepaymentSummary();
        this.repaymentForm.reset({ loanId: null, amount: '' });
        this.filterLoansForPayment();
        console.log('Loans after payment:', this.loans);
        console.log('Repayments after payment:', this.repayments);
      }
    } else {
      alert('Please select a loan and enter a valid amount.');
    }
  }

  viewLoanSchedule(loanId: number) {
    this.router.navigate(['/user/loan-details', loanId]);
  }

  selectLoanForPayment(repayment: Repayment) {
    this.repaymentForm.patchValue({ loanId: repayment.loanId, amount: repayment.amountDue + (repayment.penaltyAmount || 0) });
    document.querySelector('.make-payment-section')?.scrollIntoView({ behavior: 'smooth' });
  }

  viewReceipt(repaymentId: number) {
    alert(`Viewing receipt for Repayment ID: ${repaymentId}`);
  }

  viewLoanDetails(loanId: number) {
    this.router.navigate(['/user/loan-details', loanId]);
  }
}

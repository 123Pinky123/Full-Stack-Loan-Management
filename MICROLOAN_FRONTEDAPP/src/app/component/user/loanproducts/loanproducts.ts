// src/app/component/user/loanproducts/loanproducts.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { LoanService, Loan } from '../../service/loan.service';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-loanproducts',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './loanproducts.html',
  styleUrls: ['./loanproducts.css']
})
export class LoanProductsComponent implements OnInit {
  loans: Loan[] = [];

  products = [
    {
      key: 'home',
      title: 'Home Loan',
      icon: '🏠',
      description: 'Buy your dream home with flexible tenure and competitive interest.',
      longDescription:
        'Finance purchase or construction of residential property with flexible tenures up to 30 years, attractive interest rates, and balance transfer options. Prepayment and part-payment facilities available.',
      highlights: [
        'Loan-to-Value (LTV) up to 80-90% of property value',
        'Top-up option on existing home loan',
        'Balance transfer facility to reduce EMIs'
      ],
      eligibility: [
        'Salaried or self-employed applicants',
        'Stable income proof and credit history',
        'Age 21-65 years at loan maturity'
      ],
      typical: {
        amount: '₹5L – ₹2Cr',
        tenure: 'Up to 30 years',
        rate: 'From ~8.5% p.a. (indicative)'
      },
      documents: [
        'KYC: Aadhaar/PAN',
        'Income proof: Salary slips/ITR',
        'Property documents and valuation report'
      ]
    },
    {
      key: 'education',
      title: 'Education Loan',
      icon: '🎓',
      description: 'Fund higher education in India or abroad with low EMIs.',
      longDescription:
        'Covers tuition fees, living expenses, and travel for higher education. Enjoy moratorium during the course period and repay comfortably after completion with subsidized rates for eligible programs.',
      highlights: [
        'Moratorium during study + grace period',
        'Co-applicant (parent/guardian) allowed',
        'Coverage of tuition, accommodation, and travel'
      ],
      eligibility: [
        'Confirmed admission to recognized institutions',
        'Co-applicant with stable income preferred',
        'Age 18+ at application'
      ],
      typical: {
        amount: '₹2L – ₹50L',
        tenure: 'Up to 15 years',
        rate: 'From ~9.0% p.a. (indicative)'
      },
      documents: [
        'Admission letter and fee structure',
        'KYC of applicant and co-applicant',
        'Income proof of co-applicant'
      ]
    },
    {
      key: 'personal',
      title: 'Personal Loan',
      icon: '👤',
      description: 'Quick unsecured loan for your personal needs and emergencies.',
      longDescription:
        'Instant approval for medical, travel, wedding, or other personal needs. No collateral required, minimal documentation, and flexible EMIs with transparent charges.',
      highlights: [
        'No collateral required',
        'Quick disbursal with minimal documents',
        'Flexible EMI options'
      ],
      eligibility: [
        'Salaried with minimum net income threshold',
        'Good credit score (typically 700+)',
        'Age 21-60 years'
      ],
      typical: {
        amount: '₹50K – ₹20L',
        tenure: '1 – 5 years',
        rate: 'From ~11.5% p.a. (indicative)'
      },
      documents: [
        'KYC: Aadhaar/PAN',
        'Last 3-6 months salary slips/bank statements',
        'Address proof'
      ]
    },
    {
      key: 'business',
      title: 'Business Loan',
      icon: '💼',
      description: 'Grow your business with working capital and expansion finance.',
      longDescription:
        'Working capital finance, equipment purchase, and expansion funding for SMEs. Flexible repayment schedules aligned with cash flows and quick disbursal.',
      highlights: [
        'Working capital and term loan options',
        'Unsecured limits based on turnover and credit',
        'EMIs aligned to cash flow cycles'
      ],
      eligibility: [
        'Minimum business vintage (typically 1-3 years)',
        'Audited financials or GST returns',
        'Satisfactory bureau profile'
      ],
      typical: {
        amount: '₹2L – ₹1Cr',
        tenure: '1 – 7 years',
        rate: 'From ~12% p.a. (indicative)'
      },
      documents: [
        'KYC of proprietors/directors',
        'Financials: ITR, P&L, Balance Sheet',
        'GST returns and bank statements'
      ]
    }
  ];

  selectedProduct: {
    key: string;
    title: string;
    icon: string;
    description: string;
    longDescription: string;
    highlights: string[];
    eligibility: string[];
    typical: { amount: string; tenure: string; rate: string };
    documents: string[];
  } | null = null;

  constructor(
    private loanService: LoanService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loanService.getLoans().subscribe({
      next: (loans: Loan[]) => {
        this.loans = loans;
      },
      error: (err) => {
        console.error('Error fetching loans:', err);
      }
    });
  }

  handleApply(productKey: string) {
    this.router.navigate(['/user/applications'], { queryParams: { type: productKey } });
  }

  openDetails(product: any) {
    this.selectedProduct = product;
  }

  closeDetails() {
    this.selectedProduct = null;
  }
}

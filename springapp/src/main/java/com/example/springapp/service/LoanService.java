package com.example.springapp.service;

import com.example.springapp.model.Loan;
import com.example.springapp.repository.LoanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class LoanService {

    @Autowired
    private LoanRepository loanRepository;

    public List<Loan> getAllLoans() {
        return loanRepository.findAll();
    }

    public Optional<Loan> getLoanById(Long id) {
        return loanRepository.findById(id);
    }

    public List<Loan> getLoansByCustomerId(String customerId) {
        return loanRepository.findByCustomerId(customerId);
    }

    public Loan createLoan(Loan loan) {
        // Auto-calculate due date based on start date and loan term
        LocalDate dueDate = loan.getStartDate().plusMonths(loan.getLoanTerm());
        loan.setDueDate(dueDate);
        
        // Set initial balance equal to loan amount
        loan.setInitialBalance(loan.getLoanAmount());
        
        // Set default status to PENDING if not specified
        if (loan.getStatus() == null) {
            loan.setStatus(Loan.LoanStatus.PENDING);
        }
        
        // Set creation date
        loan.setCreatedAt(LocalDate.now());
        
        return loanRepository.save(loan);
    }

    public Loan updateLoan(Long id, Loan updatedLoan) {
        return loanRepository.findById(id).map(loan -> {
            loan.setCustomerId(updatedLoan.getCustomerId());
            loan.setLoanAmount(updatedLoan.getLoanAmount());
            loan.setInterestRate(updatedLoan.getInterestRate());
            loan.setLoanTerm(updatedLoan.getLoanTerm());
            loan.setStartDate(updatedLoan.getStartDate());
            loan.setRepaymentSchedule(updatedLoan.getRepaymentSchedule());
            loan.setStatus(updatedLoan.getStatus());
            
            // Recalculate due date if start date or term changed
            LocalDate dueDate = updatedLoan.getStartDate().plusMonths(updatedLoan.getLoanTerm());
            loan.setDueDate(dueDate);
            
            return loanRepository.save(loan);
        }).orElseThrow(() -> new RuntimeException("Loan not found with id: " + id));
    }

    public Loan updateLoanStatus(Long id, Loan.LoanStatus status) {
        return loanRepository.findById(id).map(loan -> {
            loan.setStatus(status);
            return loanRepository.save(loan);
        }).orElseThrow(() -> new RuntimeException("Loan not found with id: " + id));
    }

    public void deleteLoan(Long id) {
        loanRepository.deleteById(id);
    }

    public List<Loan> getLoansByStatus(Loan.LoanStatus status) {
        return loanRepository.findByStatus(status);
    }
}

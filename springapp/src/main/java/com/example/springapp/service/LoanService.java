package com.example.springapp.service;

import com.example.springapp.model.Loan;
import com.example.springapp.repository.LoanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public Loan createLoan(Loan loan) {
        return loanRepository.save(loan);
    }

    public Loan updateLoan(Long id, Loan updatedLoan) {
        return loanRepository.findById(id).map(loan -> {
            loan.setLoanType(updatedLoan.getLoanType());
            loan.setInterestRate(updatedLoan.getInterestRate());
            return loanRepository.save(loan);
        }).orElseThrow(() -> new RuntimeException("Loan not found with id: " + id));
    }

    public void deleteLoan(Long id) {
        loanRepository.deleteById(id);
    }
}

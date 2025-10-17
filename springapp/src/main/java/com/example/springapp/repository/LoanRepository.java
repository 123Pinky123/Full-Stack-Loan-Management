package com.example.springapp.repository;

import com.example.springapp.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LoanRepository extends JpaRepository<Loan, Long> {
    List<Loan> findByCustomerId(String customerId);
    List<Loan> findByStatus(Loan.LoanStatus status);
}

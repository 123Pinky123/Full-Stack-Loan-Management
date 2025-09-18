package com.example.springapp.model;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Repayment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private BigDecimal amount;

    private String status; // e.g., "PENDING", "PAID", etc.

    private LocalDate dueDate;

    @ManyToOne
    @JoinColumn(name = "loan_id")
    private Loan loan;
}

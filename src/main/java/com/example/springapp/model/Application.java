package com.example.springapp.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "applications")
@Data

@Builder
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "loan_id", nullable = false)
    private Loan loan;

    @Column(nullable = false)
    private String status; // PENDING, APPROVED, REJECTED

    @Column(nullable = false)
    private LocalDate appliedDate;
}

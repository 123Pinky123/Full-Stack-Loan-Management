package com.example.springapp.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "loans")
@Data

@Builder
public class Loan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String loanType;

    @Column(nullable = false)
    private Double interestRate;

    @Column(nullable = false)
    private Integer tenureMonths;

    @Column(nullable = false)
    private Double maxAmount;
}

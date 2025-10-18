package com.example.springapp.DTO;

import lombok.*;
import java.time.LocalDate;

@Data
public class LoanDTO {
    private Long id;
    private Long userId;
    private Long applicationId;
    private Double principalAmount;
    private Double interestRate;      // Annual interest rate
    private Integer tenureMonths;     // Number of months
    private LocalDate startDate;
    private LocalDate endDate;
    private String status;            // e.g., "ACTIVE", "CLOSED", "DEFAULTED"
}


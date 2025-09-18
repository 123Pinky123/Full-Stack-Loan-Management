
package com.example.springapp.DTO;

import lombok.*;
import java.time.LocalDate;

@Data
public class ApplicationDTO {
    private Long id;
    private Long userId;
    private String loanType;        // e.g., "PERSONAL", "HOME", "CAR"
    private Double amountRequested;
    private String status;          // e.g., "PENDING", "APPROVED", "REJECTED"
    private LocalDate applicationDate;
    private String remarks;         // Optional admin comments
}

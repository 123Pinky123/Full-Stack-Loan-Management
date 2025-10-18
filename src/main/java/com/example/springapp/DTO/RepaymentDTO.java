
package com.example.springapp.DTO;

import lombok.*;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RepaymentDTO {
    private Long id;
    private Long loanId;
    private LocalDate paymentDate;
    private Double amountPaid;
    private String paymentMethod;  // e.g., "UPI", "BANK_TRANSFER"
    private String status;         // e.g., "PAID", "FAILED"
}

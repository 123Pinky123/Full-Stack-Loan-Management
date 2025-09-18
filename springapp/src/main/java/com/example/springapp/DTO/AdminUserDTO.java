package com.example.springapp.DTO;

import lombok.*;

@Data
public class AdminUserDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String password;  // For security, you may want to omit this in responses
    private String role;      // e.g., "SUPER_ADMIN", "STAFF"
}

package com.example.springapp.DTO;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private Long id;

    // Combine first and last name into one field (like your Angular form)
    private String fullname;

    private String email;
    private String phone;

    // Include password and confirm password for signup
    private String password;
    private String confirmPassword;
}

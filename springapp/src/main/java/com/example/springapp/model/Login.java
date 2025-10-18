package com.example.springapp.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "logins")
@Data

@Builder
public class Login {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;  // Or username

    @Column(nullable = false)
    private String password;  // Store a hashed password (not plain text!)

    @Column(nullable = false)
    private String role;  // USER, ADMIN, etc.
}


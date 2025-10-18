package com.example.springapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.MediaType; // <-- Add this line
// ...existing code...

import com.example.springapp.model.User;
import com.example.springapp.repository.UserRepository;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200") // Allow Angular app
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    

    // ✅ USER SIGNUP
    @PostMapping(value = "/signup" , consumes = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        // Check if email already exists
        if (userRepository.existsByEmail(user.getEmail())) {
            return ResponseEntity.badRequest().body("Email already registered!");
        }

        // You can encrypt password here (optional, shown below)
        // user.setPassword(passwordEncoder.encode(user.getPassword()));

        userRepository.save(user);
        return ResponseEntity.ok("Registration successful!");
    }

    // ✅ USER LOGIN
    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody User loginRequest) {
        Optional<User> userOptional = userRepository.findByEmail(loginRequest.getEmail());

        if (userOptional.isEmpty()) {
            return ResponseEntity.status(401).body("User not found!");
        }

        User user = userOptional.get();

        if (!user.getPassword().equals(loginRequest.getPassword())) {
            return ResponseEntity.status(401).body("Invalid password!");
        }

        return ResponseEntity.ok("Login successful!");
    }
}

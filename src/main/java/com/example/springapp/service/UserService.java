package com.example.springapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.springapp.model.User;
import com.example.springapp.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public String registerUser(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            return "Email already registered!";
        }
        userRepository.save(user);
        return "Registration successful!";
    }
}

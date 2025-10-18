package com.example.springapp.service;

import com.example.springapp.model.Login;
import com.example.springapp.repository.LoginRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LoginService {

    @Autowired
    private LoginRepository loginRepository;

    public Optional<Login> validateLogin(String email, String password) {
        return loginRepository.findByEmailAndPassword(email, password);
    }
}

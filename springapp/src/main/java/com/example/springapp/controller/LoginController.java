package com.example.springapp.controller;

import com.example.springapp.model.Login;
import com.example.springapp.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/login")
@CrossOrigin(origins = "*")
public class LoginController {

    @Autowired
    private LoginService loginService;

    @PostMapping
    public ResponseEntity<Login> login(@RequestBody Login loginRequest) {
        Optional<Login> user = loginService.validateLogin(loginRequest.getEmail(), loginRequest.getPassword());
        return user.map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(401).build()); // 401 Unauthorized if invalid
    }
}

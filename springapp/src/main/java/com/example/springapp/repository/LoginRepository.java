package com.example.springapp.repository;

import com.example.springapp.model.Login;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LoginRepository extends JpaRepository<Login, Long> {

    // This method will find a login by email and password
    Optional<Login> findByEmailAndPassword(String email, String password);
}


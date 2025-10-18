package com.example.springapp.service;

import com.example.springapp.model.AdminUser;
import com.example.springapp.repository.AdminUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminUserService {

    @Autowired
    private AdminUserRepository adminUserRepository;

    public List<AdminUser> getAllAdminUsers() {
        return adminUserRepository.findAll();
    }

    public Optional<AdminUser> getAdminUserById(Long id) {
        return adminUserRepository.findById(id);
    }

    public AdminUser createAdminUser(AdminUser adminUser) {
        return adminUserRepository.save(adminUser);
    }

    public AdminUser updateAdminUser(Long id, AdminUser updatedAdmin) {
        return adminUserRepository.findById(id).map(admin -> {
            admin.setUsername(updatedAdmin.getUsername());
            admin.setPassword(updatedAdmin.getPassword());
            admin.setRole(updatedAdmin.getRole());
            return adminUserRepository.save(admin);
        }).orElseThrow(() -> new RuntimeException("Admin user not found with id: " + id));
    }

    public void deleteAdminUser(Long id) {
        adminUserRepository.deleteById(id);
    }
}

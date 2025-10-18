package com.example.springapp.controller;

import com.example.springapp.model.AdminUser;
import com.example.springapp.service.AdminUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin-users")
@CrossOrigin(origins = "*")
public class AdminUserController {

    @Autowired
    private AdminUserService adminUserService;

    @GetMapping
    public List<AdminUser> getAllAdminUsers() {
        return adminUserService.getAllAdminUsers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<AdminUser> getAdminUserById(@PathVariable Long id) {
        return adminUserService.getAdminUserById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public AdminUser createAdminUser(@RequestBody AdminUser adminUser) {
        return adminUserService.createAdminUser(adminUser);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AdminUser> updateAdminUser(@PathVariable Long id, @RequestBody AdminUser adminUser) {
        try {
            return ResponseEntity.ok(adminUserService.updateAdminUser(id, adminUser));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAdminUser(@PathVariable Long id) {
        adminUserService.deleteAdminUser(id);
        return ResponseEntity.noContent().build();
    }
}

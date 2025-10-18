package com.example.springapp.service;

import com.example.springapp.model.Application;
import com.example.springapp.repository.ApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ApplicationService {

    @Autowired
    private ApplicationRepository applicationRepository;

    public List<Application> getAllApplications() {
        return applicationRepository.findAll();
    }

    public Optional<Application> getApplicationById(Long id) {
        return applicationRepository.findById(id);
    }

    public Application createApplication(Application application) {
        return applicationRepository.save(application);
    }

    public Application updateApplication(Long id, Application updatedApplication) {
        return applicationRepository.findById(id).map(app -> {
            // Update only existing fields in Application entity
            app.setUser(updatedApplication.getUser());
            app.setLoan(updatedApplication.getLoan());
            app.setStatus(updatedApplication.getStatus());
            app.setAppliedDate(updatedApplication.getAppliedDate());
            return applicationRepository.save(app);
        }).orElseThrow(() -> new RuntimeException("Application not found with id: " + id));
    }

    public void deleteApplication(Long id) {
        applicationRepository.deleteById(id);
    }
}

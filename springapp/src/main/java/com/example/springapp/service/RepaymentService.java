package com.example.springapp.service;

import com.example.springapp.model.Repayment;
import com.example.springapp.repository.RepaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RepaymentService {

    @Autowired
    private RepaymentRepository repaymentRepository;

    public List<Repayment> getAllRepayments() {
        return repaymentRepository.findAll();
    }

    public Optional<Repayment> getRepaymentById(Long id) {
        return repaymentRepository.findById(id);
    }

    public Repayment createRepayment(Repayment repayment) {
        return repaymentRepository.save(repayment);
    }

    public Repayment updateRepayment(Long id, Repayment updatedRepayment) {
        return repaymentRepository.findById(id).map(rep -> {
            rep.setAmount(updatedRepayment.getAmount());
            rep.setDueDate(updatedRepayment.getDueDate());
            rep.setStatus(updatedRepayment.getStatus());
            return repaymentRepository.save(rep);
        }).orElseThrow(() -> new RuntimeException("Repayment not found with id: " + id));
    }

    public void deleteRepayment(Long id) {
        repaymentRepository.deleteById(id);
    }
}

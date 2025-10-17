package com.HealthCare.HealthCare.controller;

import com.HealthCare.HealthCare.entity.Insurance;
import com.HealthCare.HealthCare.repository.InsuranceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/insurance")
public class InsuranceController {

    @Autowired
    private InsuranceRepository insuranceRepository;

    // Get all insurance policies for a patient (for dropdown)
    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<Insurance>> getPatientInsurancePolicies(@PathVariable Long patientId) {
        List<Insurance> policies = insuranceRepository.findByPatientPatientId(patientId);
        return ResponseEntity.ok(policies);
    }

    // Get specific policy details
    @GetMapping("/policy/{policyNumber}")
    public ResponseEntity<Insurance> getPolicyDetails(@PathVariable String policyNumber) {
        return insuranceRepository.findByPolicyNumber(policyNumber)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
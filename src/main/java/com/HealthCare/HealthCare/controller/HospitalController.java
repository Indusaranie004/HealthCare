package com.HealthCare.HealthCare.controller;

import com.HealthCare.HealthCare.dto.HospitalCreateRequest;
import com.HealthCare.HealthCare.dto.HospitalResponse;
import com.HealthCare.HealthCare.entity.MedicalService;
import com.HealthCare.HealthCare.service.HospitalService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hospitals")
@RequiredArgsConstructor
public class HospitalController {

    private final HospitalService hospitalService;

    @PostMapping
    public ResponseEntity<HospitalResponse> addHospital(@Valid @RequestBody HospitalCreateRequest request) {
        HospitalResponse response = hospitalService.addHospital(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/services")
    public ResponseEntity<List<MedicalService> > getAllServices() {
        return ResponseEntity.ok(hospitalService.getAllServices());
    }
}
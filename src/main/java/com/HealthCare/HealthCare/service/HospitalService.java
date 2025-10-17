package com.HealthCare.HealthCare.service;

import com.HealthCare.HealthCare.dto.HospitalCreateRequest;
import com.HealthCare.HealthCare.dto.HospitalResponse;
import com.HealthCare.HealthCare.entity.Hospital;
import com.HealthCare.HealthCare.entity.MedicalService;
import com.HealthCare.HealthCare.repository.HospitalRepository;
import com.HealthCare.HealthCare.repository.ServiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class HospitalService {

    private final HospitalRepository hospitalRepository;
    private final ServiceRepository serviceRepository;

    @Transactional
    public HospitalResponse addHospital(HospitalCreateRequest request) {
        // Validate that all service IDs exist
        List<MedicalService> services = serviceRepository.findAllById(request.getServiceIds());
        if (services.size() != request.getServiceIds().size()) {
            throw new IllegalArgumentException("One or more service IDs are invalid");
        }

        // Create and save hospital
        Hospital hospital = new Hospital();
        hospital.setName(request.getName());
        hospital.setLocation(request.getLocation());
        hospital.setType(request.getType());
        hospital.setServices(Set.copyOf(services)); // Immutable copy

        Hospital saved = hospitalRepository.save(hospital);
        return new HospitalResponse(saved);
    }

    public List<MedicalService> getAllServices() {
        return serviceRepository.findAll();
    }
}
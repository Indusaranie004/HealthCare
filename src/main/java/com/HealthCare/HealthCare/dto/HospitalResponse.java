package com.HealthCare.HealthCare.dto;

import com.HealthCare.HealthCare.entity.Hospital;
import com.HealthCare.HealthCare.entity.HospitalType;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class HospitalResponse {
    private Long id;
    private String name;
    private String location;
    private HospitalType type;
    private LocalDateTime createdAt;
    private List<String> services;

    public HospitalResponse(Hospital hospital) {
        this.id = hospital.getId();
        this.name = hospital.getName();
        this.location = hospital.getLocation();
        this.type = hospital.getType();
        this.createdAt = hospital.getCreatedAt();
        this.services = hospital.getServices().stream()
                .map(s -> s.getName())
                .collect(Collectors.toList());
    }
}
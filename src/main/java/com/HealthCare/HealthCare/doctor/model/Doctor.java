package com.HealthCare.HealthCare.doctor.model;

import com.HealthCare.HealthCare.hospital.model.Hospital;
import com.HealthCare.HealthCare.serviceType.model.ServiceType;
import jakarta.persistence.*;
import java.util.List;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.ArrayList;
import java.util.List;
import java.util.Collections;


@Entity
@Table(name = "doctor")

public class Doctor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String specialization;

    // Store as JSON string in DB
    @Column(name = "available_days", columnDefinition = "JSON")
    private String availableDaysJson;

    @ManyToOne
    @JoinColumn(name = "hospital_id", nullable = false)
    private Hospital hospital;

    @ManyToOne
    @JoinColumn(name = "service_type_id", nullable = false)
    private ServiceType serviceType;

    // Default constructor
    public Doctor() {}

    // Helper: Get availableDays as List<String>
    public List<String> getAvailableDays() {
        if (availableDaysJson == null || availableDaysJson.isEmpty()) {
            return Collections.emptyList();
        }
        try {
            ObjectMapper mapper = new ObjectMapper();
            return mapper.readValue(availableDaysJson, new TypeReference<List<String>>() {});
        } catch (Exception e) {
            return Collections.emptyList();
        }
    }

    // Helper: Set availableDays from List<String>
    public void setAvailableDays(List<String> days) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            this.availableDaysJson = mapper.writeValueAsString(days);
        } catch (Exception e) {
            this.availableDaysJson = "[]";
        }
    }

    // Standard getters/setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getSpecialization() { return specialization; }
    public void setSpecialization(String specialization) { this.specialization = specialization; }

    public Hospital getHospital() { return hospital; }
    public void setHospital(Hospital hospital) { this.hospital = hospital; }

    public ServiceType getServiceType() { return serviceType; }
    public void setServiceType(ServiceType serviceType) { this.serviceType = serviceType; }

}

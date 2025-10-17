package com.HealthCare.HealthCare.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class PatientReportDto {
    private Long patientId;
    private String patientName;
    private String hospitalName;
    private LocalDate lastVisit;
}
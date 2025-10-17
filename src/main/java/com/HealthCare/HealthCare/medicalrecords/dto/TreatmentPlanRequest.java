package com.HealthCare.HealthCare.medicalrecords.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TreatmentPlanRequest {
    private String currentMedication;
    private String futureAppointments;
    private String treatmentNote;
}

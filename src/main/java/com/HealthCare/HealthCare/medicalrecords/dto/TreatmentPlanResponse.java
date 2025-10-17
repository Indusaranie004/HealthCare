package com.HealthCare.HealthCare.medicalrecords.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TreatmentPlanResponse {
    private Long treatmentId;
    private String currentMedication;
    private String futureAppointments;
    private String treatmentNote;
}

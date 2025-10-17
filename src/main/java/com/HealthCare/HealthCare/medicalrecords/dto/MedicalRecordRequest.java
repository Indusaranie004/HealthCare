package com.HealthCare.HealthCare.medicalrecords.dto;

import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MedicalRecordRequest {
    private String demographic;
    private String alleges;
    private String chronicCondition;
    private String pastSurgeries;
    private Long patientId;
    private List<TreatmentPlanRequest> treatmentPlans; // ✅ MUST be generic
}

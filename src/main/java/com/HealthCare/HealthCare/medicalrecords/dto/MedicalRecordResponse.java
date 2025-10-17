package com.HealthCare.HealthCare.medicalrecords.dto;

import lombok.*;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MedicalRecordResponse {
    private Long recordId;
    private String demographic;
    private String alleges;
    private String chronicCondition;
    private String pastSurgeries;
    private Long patientId;
    private List<TreatmentPlanResponse> treatmentPlans;
}

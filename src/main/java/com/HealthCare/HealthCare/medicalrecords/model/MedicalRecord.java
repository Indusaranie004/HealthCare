package com.HealthCare.HealthCare.medicalrecords.model;

import com.HealthCare.HealthCare.patient.model.Patient;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "medical_records")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MedicalRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long recordId;

    private String demographic;
    private String alleges;
    private String chronicCondition;
    private String pastSurgeries;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;

    // Initialize list to avoid NullPointerException
    @OneToMany(mappedBy = "medicalRecord", cascade = CascadeType.ALL, orphanRemoval = false)
    private List<TreatmentPlan> treatmentPlans = new ArrayList<>();

    // Prevent null assignment
    public void setTreatmentPlans(List<TreatmentPlan> treatmentPlans) {
        this.treatmentPlans = (treatmentPlans != null) ?
                new ArrayList<>(treatmentPlans) : new ArrayList<>();
    }
}

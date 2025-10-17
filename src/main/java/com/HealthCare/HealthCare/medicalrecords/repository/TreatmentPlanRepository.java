package com.HealthCare.HealthCare.medicalrecords.repository;

import com.HealthCare.HealthCare.medicalrecords.model.TreatmentPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TreatmentPlanRepository extends JpaRepository<TreatmentPlan, Long> {
    List<TreatmentPlan> findByMedicalRecordRecordId(Long recordId);
}

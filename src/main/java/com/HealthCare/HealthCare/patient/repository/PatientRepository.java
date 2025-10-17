package com.HealthCare.HealthCare.patient.repository;

import com.HealthCare.HealthCare.patient.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository



public interface PatientRepository extends JpaRepository<Patient, Long> {
    Patient findByHealthCardNumber(String healthCardNumber);
}

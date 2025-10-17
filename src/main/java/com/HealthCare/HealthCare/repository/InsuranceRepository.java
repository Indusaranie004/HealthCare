package com.HealthCare.HealthCare.repository;

import com.HealthCare.HealthCare.entity.Insurance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface InsuranceRepository extends JpaRepository<Insurance, Long> {
    Optional<Insurance> findByPolicyNumber(String policyNumber);
    List<Insurance> findByPatientPatientId(Long patientId);
}
package com.HealthCare.HealthCare.repository;

import com.HealthCare.HealthCare.entity.MedicalService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServiceRepository extends JpaRepository<MedicalService, Long> {
}
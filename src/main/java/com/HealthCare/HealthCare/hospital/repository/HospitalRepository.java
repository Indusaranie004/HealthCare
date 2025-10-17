package com.HealthCare.HealthCare.hospital.repository;

import com.HealthCare.HealthCare.hospital.model.Hospital;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository


public interface HospitalRepository extends JpaRepository<Hospital, Long>{
    // No custom methods needed for now — findAll() inherited


}

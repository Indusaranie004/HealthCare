package com.HealthCare.HealthCare.repository;

import com.HealthCare.HealthCare.entity.Government;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GovernmentRepository extends JpaRepository<Government, Long> {
    Optional<Government> findByGovernmentId(String governmentId);
}
package com.HealthCare.HealthCare.serviceType.repository;
import com.HealthCare.HealthCare.serviceType.model.ServiceType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository




public interface ServiceTypeRepository extends JpaRepository<ServiceType, Long> {
    // findAll() inherited — sufficient for your use case




}

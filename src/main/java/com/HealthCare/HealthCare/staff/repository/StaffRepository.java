package com.HealthCare.HealthCare.staff.repository;

import com.HealthCare.HealthCare.staff.model.Staff;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface StaffRepository extends JpaRepository<Staff, Long> {
    Optional<Staff> findByEmail(String email);
}

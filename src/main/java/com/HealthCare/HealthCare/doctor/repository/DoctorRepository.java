package com.HealthCare.HealthCare.doctor.repository;

import com.HealthCare.HealthCare.doctor.model.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository



public interface DoctorRepository extends JpaRepository<Doctor, Long>{

    /**
     * Find doctors by hospital and service type (used after patient selects hospital → service type)
     */
    List<Doctor> findByHospitalIdAndServiceTypeId(Long hospitalId, Long serviceTypeId);



}

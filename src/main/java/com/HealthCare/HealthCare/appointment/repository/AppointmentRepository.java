package com.HealthCare.HealthCare.appointment.repository;

import com.HealthCare.HealthCare.appointment.model.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.LocalDateTime;
import java.util.List;


public interface AppointmentRepository extends JpaRepository<Appointment, Long>{
    List<Appointment> findByPatientId(Long patientId);
    List<Appointment> findByDoctorIdAndDateTime(Long doctorId, LocalDateTime dateTime);
    List<Appointment> findByPatientIdAndDateTime(Long patientId, LocalDateTime dateTime);


}

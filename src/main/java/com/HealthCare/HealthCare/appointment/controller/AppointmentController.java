package com.HealthCare.HealthCare.appointment.controller;

import com.HealthCare.HealthCare.appointment.dto.AppointmentRequestDTO;
import com.HealthCare.HealthCare.appointment.dto.AppointmentResponseDTO;
import com.HealthCare.HealthCare.appointment.service.AppointmentService;
import com.HealthCare.HealthCare.doctor.model.Doctor;
import com.HealthCare.HealthCare.hospital.model.Hospital;
import com.HealthCare.HealthCare.serviceType.model.ServiceType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")




public class AppointmentController {

    @Autowired private AppointmentService service;

    // UI Flow Endpoints
    @GetMapping("/hospitals") public ResponseEntity<List<Hospital>> getHospitals() {
        return ResponseEntity.ok(service.getAllHospitals());
    }

    @GetMapping("/service-types/hospital/{hospitalId}") public ResponseEntity<List<ServiceType>> getServiceTypes(@PathVariable Long hospitalId) {
        return ResponseEntity.ok(service.getServiceTypesByHospital(hospitalId));
    }

    @GetMapping("/doctors/hospital/{hospitalId}/service/{serviceTypeId}") public ResponseEntity<List<Doctor>> getDoctors(
            @PathVariable Long hospitalId, @PathVariable Long serviceTypeId) {
        return ResponseEntity.ok(service.getDoctorsByHospitalAndService(hospitalId, serviceTypeId));
    }

    // Core Use Case Endpoints
    @PostMapping("/book") public ResponseEntity<AppointmentResponseDTO> book(@RequestBody AppointmentRequestDTO dto) {
        return ResponseEntity.ok(service.bookAppointment(dto));
    }

    @PutMapping("/reschedule/{id}") public ResponseEntity<AppointmentResponseDTO> reschedule(@PathVariable Long id, @RequestBody AppointmentRequestDTO dto) {
        return ResponseEntity.ok(service.rescheduleAppointment(id, dto));
    }

    @DeleteMapping("/cancel/{id}") public ResponseEntity<String> cancel(@PathVariable Long id) {
        service.cancelAppointment(id);
        return ResponseEntity.ok("Cancelled");
    }

    @GetMapping("/patient/{patientId}") public ResponseEntity<List<AppointmentResponseDTO>> getByPatient(@PathVariable Long patientId) {
        return ResponseEntity.ok(service.getAppointmentsByPatient(patientId));
    }

}

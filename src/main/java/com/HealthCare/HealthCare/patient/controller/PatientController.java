package com.HealthCare.HealthCare.patient.controller;

import com.HealthCare.HealthCare.patient.dto.PatientRequest;
import com.HealthCare.HealthCare.patient.dto.PatientResponse;
import com.HealthCare.HealthCare.patient.service.PatientService;
import com.google.zxing.WriterException;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

/**
 * REST Controller for managing patients.
 * <p>
 * Provides endpoints for creating, reading, updating, deleting, and searching patients.
 * All responses return PatientResponse DTOs including QR code information.
 * </p>
 */
@RestController
@RequestMapping("/api/patients")
public class PatientController {

    private final PatientService patientService;

    public PatientController(PatientService patientService) {
        this.patientService = patientService;
    }

    /**
     * Registers a new patient and generates a QR code.
     *
     * @param request patient request DTO
     * @return the created patient response DTO
     * @throws IOException     if QR code generation fails
     * @throws WriterException if QR code encoding fails
     */
    @PostMapping("/register")
    public ResponseEntity<PatientResponse> createPatient(@RequestBody PatientRequest request)
            throws IOException, WriterException {
        PatientResponse response = patientService.createPatient(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    /**
     * Retrieves all patients.
     *
     * @return list of patient response DTOs
     */
    @GetMapping
    public ResponseEntity<List<PatientResponse>> getAllPatients() {
        List<PatientResponse> patients = patientService.getAllPatients();
        return ResponseEntity.ok(patients);
    }

    /**
     * Retrieves a patient by ID.
     *
     * @param id patient ID
     * @return patient response DTO
     */
    @GetMapping("/{id}")
    public ResponseEntity<PatientResponse> getPatientById(@PathVariable("id") Long id) {
        PatientResponse patient = patientService.getPatientById(id);
        return ResponseEntity.ok(patient);
    }

    /**
     * Updates an existing patient by ID.
     *
     * @param id      patient ID
     * @param request patient request DTO
     * @return updated patient response DTO
     * @throws IOException     if QR code generation fails
     * @throws WriterException if QR code encoding fails
     */
    @PutMapping("/{id}")
    public ResponseEntity<PatientResponse> updatePatient(
            @PathVariable("id") Long id,  // ✅ Explicit name
            @RequestBody PatientRequest request)
            throws IOException, WriterException {
        PatientResponse response = patientService.updatePatient(id, request);
        return ResponseEntity.ok(response);
    }



    /**
     * Deletes a patient by ID.
     *
     * @param id patient ID
     * @return HTTP 204 No Content
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePatient(@PathVariable("id") Long id) {
        patientService.deletePatient(id);
        return ResponseEntity.noContent().build();
    }
    /**
     * Searches patients by optional fields: firstName, lastName, dob, status, department.
     *
     * @param firstName  optional first name
     * @param lastName   optional last name
     * @param dob        optional date of birth
     * @param status     optional status
     * @param department optional department
     * @return list of matching patient response DTOs
     */
    @GetMapping("/search")
    public ResponseEntity<List<PatientResponse>> searchPatients(
            @RequestParam(value = "patientId", required = false) Long patientId,
            @RequestParam(value = "firstName", required = false) String firstName,
            @RequestParam(value = "lastName", required = false) String lastName,
            @RequestParam(value = "dob", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dob,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam(value = "department", required = false) String department
    ) {
        List<PatientResponse> results = patientService.searchPatients(patientId,firstName, lastName, dob, status, department);
        return ResponseEntity.ok(results);
    }
}


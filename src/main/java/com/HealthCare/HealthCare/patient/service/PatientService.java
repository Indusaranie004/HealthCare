package com.HealthCare.HealthCare.patient.service;

import com.HealthCare.HealthCare.patient.dto.PatientRequest;
import com.HealthCare.HealthCare.patient.dto.PatientResponse;
import com.HealthCare.HealthCare.patient.model.Patient;
import com.HealthCare.HealthCare.patient.model.InsurancePayment;
import com.HealthCare.HealthCare.patient.repository.PatientRepository;
import com.HealthCare.HealthCare.exception.ResourceNotFoundException;
import com.HealthCare.HealthCare.patient.util.QRCodeGenerator;
import com.google.zxing.WriterException;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service layer for managing patients.
 * <p>
 * Provides CRUD operations, search functionality, and QR code generation for patients.
 * Implements clean architecture and adheres to SOLID principles.
 * </p>
 */
@Service
public class PatientService {

    private final PatientRepository patientRepository;


    public PatientService(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    /**
     * Creates a new patient, saves it to the database, and generates a QR code.
     *
     * @param request the patient request DTO
     * @return the created patient response DTO with QR code
     * @throws IOException      if QR code generation fails
     * @throws WriterException  if QR code encoding fails
     */
    public PatientResponse createPatient(PatientRequest request) throws IOException, WriterException {
        Patient patient = mapToEntity(request);
        Patient saved = patientRepository.save(patient);

        // Generate QR code after ID is generated
        saved.setQrCode(QRCodeGenerator.generateQRCode(saved));
        saved = patientRepository.save(saved);

        return mapToResponse(saved);
    }

    /**
     * Retrieves all patients from the database.
     *
     * @return list of patient response DTOs
     */
    public List<PatientResponse> getAllPatients() {
        return patientRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    /**
     * Retrieves a patient by ID.
     *
     * @param patientId the patient ID
     * @return the patient response DTO
     */
    public PatientResponse getPatientById(Long patientId) {
        Patient patient = findPatientById(patientId);
        return mapToResponse(patient);
    }

    /**
     * Updates an existing patient and regenerates the QR code.
     *
     * @param patientId the patient ID
     * @param request   the updated patient request DTO
     * @return the updated patient response DTO
     * @throws IOException      if QR code generation fails
     * @throws WriterException  if QR code encoding fails
     */
    public PatientResponse updatePatient(Long patientId, PatientRequest request) throws IOException, WriterException {
        Patient patient = findPatientById(patientId);
        updateEntity(patient, request);

        // Regenerate QR code
        patient.setQrCode(QRCodeGenerator.generateQRCode(patient));
        patientRepository.save(patient);

        return mapToResponse(patient);
    }

    /**
     * Deletes a patient by ID.
     *
     * @param patientId the patient ID
     */
    public void deletePatient(Long patientId) {
        Patient patient = findPatientById(patientId);
        patientRepository.delete(patient);
    }

    /**
     * Searches patients by multiple optional fields.
     */
    public List<PatientResponse> searchPatients(Long patientId,String firstName, String lastName, LocalDate dob,
                                                String status, String department) {
        return patientRepository.findAll().stream()
                .filter(p -> (patientId == null || p.getPatientId().equals(patientId)) &&
                        (firstName == null || p.getFirstName().toLowerCase().contains(firstName.toLowerCase())) &&
                        (lastName == null || p.getLastName().toLowerCase().contains(lastName.toLowerCase())) &&
                        (dob == null || dob.equals(p.getDob())) &&
                        (status == null || p.getStatus().equalsIgnoreCase(status)) &&
                        (department == null || p.getDepartment().equalsIgnoreCase(department)))
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // ------------------------ Helper Methods ------------------------

    private Patient findPatientById(Long patientId) {
        return patientRepository.findById(patientId)
                .orElseThrow(() -> new ResourceNotFoundException("Patient not found with ID: " + patientId));
    }

    private PatientResponse mapToResponse(Patient patient) {
        return PatientResponse.builder()
                .patientId(patient.getPatientId())
                .firstName(patient.getFirstName())
                .lastName(patient.getLastName())
                .dob(patient.getDob())
                .gender(patient.getGender())
                .status(patient.getStatus())
                .department(patient.getDepartment())
                .lastVisitFrom(patient.getLastVisitFrom())
                .lastVisitTo(patient.getLastVisitTo())
                .address(patient.getAddress())
                .contactNumber(patient.getContactNumber())
                .insuranceProvider(
                        patient.getInsurancePayment() != null ? patient.getInsurancePayment().getInsuranceProvider() : null
                )
                .policyNumber(
                        patient.getInsurancePayment() != null ? patient.getInsurancePayment().getPolicyNumber() : null
                )
                .qrCode(patient.getQrCode())
                .build();
    }

    private Patient mapToEntity(PatientRequest request) {
        return Patient.builder()

                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .dob(request.getDob())
                .gender(request.getGender())
                .status(request.getStatus())
                .department(request.getDepartment())
                .lastVisitFrom(request.getLastVisitFrom())
                .lastVisitTo(request.getLastVisitTo())
                .address(request.getAddress())
                .contactNumber(request.getContactNumber())
                .insurancePayment(
                        InsurancePayment.builder()
                                .insuranceProvider(request.getInsuranceProvider())
                                .policyNumber(request.getPolicyNumber())
                                .build()
                )
                .build();
    }

    private void updateEntity(Patient patient, PatientRequest request) {
        patient.setFirstName(request.getFirstName());
        patient.setLastName(request.getLastName());
        patient.setDob(request.getDob());
        patient.setGender(request.getGender());
        patient.setStatus(request.getStatus());
        patient.setDepartment(request.getDepartment());
        patient.setLastVisitFrom(request.getLastVisitFrom());
        patient.setLastVisitTo(request.getLastVisitTo());
        patient.setAddress(request.getAddress());
        patient.setContactNumber(request.getContactNumber());

        if (patient.getInsurancePayment() == null) {
            patient.setInsurancePayment(new InsurancePayment());
        }

        patient.getInsurancePayment().setInsuranceProvider(request.getInsuranceProvider());
        patient.getInsurancePayment().setPolicyNumber(request.getPolicyNumber());
    }
}

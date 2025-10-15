package com.HealthCare.HealthCare.patient.dto;

import lombok.*;
import java.time.LocalDate;

/**
 * Data Transfer Object (DTO) for returning patient details in API responses.
 * <p>
 * Includes all essential patient information along with the generated QR code.
 * This DTO is used for sending data to the client without exposing internal entities.
 * </p>
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PatientResponse {

    /**
     * Unique identifier of the patient.
     */
    private Long patientId;

    /**
     * First name of the patient.
     */
    private String firstName;

    /**
     * Last name of the patient.
     */
    private String lastName;

    /**
     * Date of birth of the patient.
     */
    private LocalDate dob;

    /**
     * Gender of the patient.
     */
    private String gender;

    /**
     * Current status of the patient (e.g., Active, Inactive).
     */
    private String status;

    /**
     * Department associated with the patient (e.g., Cardiology, Neurology).
     */
    private String department;

    /**
     * Start date of the last visit.
     */
    private LocalDate lastVisitFrom;

    /**
     * End date of the last visit.
     */
    private LocalDate lastVisitTo;

    /**
     * Residential address of the patient.
     */
    private String address;

    /**
     * Contact number of the patient.
     */
    private String contactNumber;

    /**
     * Name of the patient's insurance provider.
     */
    private String insuranceProvider;

    /**
     * Insurance policy number.
     */
    private String policyNumber;

    /**
     * QR code representing patient details, stored as a Base64 string.
     */
    private String qrCode;
}

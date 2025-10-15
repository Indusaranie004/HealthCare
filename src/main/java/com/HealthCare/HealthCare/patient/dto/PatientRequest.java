package com.HealthCare.HealthCare.patient.dto;

import lombok.*;
import java.time.LocalDate;

/**
 * Data Transfer Object (DTO) for creating or updating a patient.
 * <p>
 * This class contains all fields required to register or update a patient,
 * including personal details, visit information, contact details, and insurance information.
 * </p>
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PatientRequest {

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
     * Gender of the patient (e.g., Male, Female, Other).
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
}

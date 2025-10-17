package com.HealthCare.HealthCare.patient.model;

import jakarta.persistence.Embeddable;
import lombok.*;

/**
 * Embedded class representing a patient's insurance and payment information.
 * This is stored within the same patients table (no new table created).
 */
@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InsurancePayment {

    /**
     * Name of the patient's insurance provider.
     */
    private String insuranceProvider;

    /**
     * Insurance policy number.
     */
    private String policyNumber;
}

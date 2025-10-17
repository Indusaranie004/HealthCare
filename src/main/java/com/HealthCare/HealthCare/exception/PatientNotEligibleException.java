package com.HealthCare.HealthCare.exception;

public class PatientNotEligibleException extends RuntimeException {
    public PatientNotEligibleException(String message) {
        super(message);
    }
}
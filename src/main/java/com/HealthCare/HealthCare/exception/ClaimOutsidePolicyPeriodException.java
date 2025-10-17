package com.HealthCare.HealthCare.exception;

public class ClaimOutsidePolicyPeriodException extends RuntimeException {
    public ClaimOutsidePolicyPeriodException(String message) {
        super(message);
    }
}
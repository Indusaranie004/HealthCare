package com.HealthCare.HealthCare.exception;

public class InsuranceClaimRejectedException extends RuntimeException {
    public InsuranceClaimRejectedException(String message) {
        super(message);
    }
}
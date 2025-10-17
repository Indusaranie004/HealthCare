package com.HealthCare.HealthCare.exception;

public class GovernmentPaymentRejectedException extends RuntimeException {
    public GovernmentPaymentRejectedException(String message) {
        super(message);
    }
}
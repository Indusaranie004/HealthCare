package com.HealthCare.HealthCare.exception;

public class InactivePolicyException extends RuntimeException {
    public InactivePolicyException(String message) {
        super(message);
    }
}
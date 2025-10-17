package com.HealthCare.HealthCare.exception;

public class IneligibleServiceException extends RuntimeException {
    public IneligibleServiceException(String message) {
        super(message);
    }
}
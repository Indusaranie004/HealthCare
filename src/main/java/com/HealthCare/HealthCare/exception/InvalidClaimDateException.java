package com.HealthCare.HealthCare.exception;

public class InvalidClaimDateException extends RuntimeException {
    public InvalidClaimDateException(String message) {
        super(message);
    }
}
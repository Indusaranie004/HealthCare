package com.HealthCare.HealthCare.exception;

public class InvalidPolicyNumberException extends RuntimeException {
    public InvalidPolicyNumberException(String message) {
        super(message);
    }
}
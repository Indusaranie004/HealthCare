package com.HealthCare.HealthCare.exception;

public class ClaimAmountExceedsLimitException extends RuntimeException {
    public ClaimAmountExceedsLimitException(String message) {
        super(message);
    }
}
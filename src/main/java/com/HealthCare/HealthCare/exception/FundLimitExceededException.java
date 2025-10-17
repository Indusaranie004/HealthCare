package com.HealthCare.HealthCare.exception;

public class FundLimitExceededException extends RuntimeException {
    public FundLimitExceededException(String message) {
        super(message);
    }
}
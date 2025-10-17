package com.HealthCare.HealthCare.appointment.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice


public class GlobalExceptionHandle {

    @ExceptionHandler(AppointmentException.class)
    public ResponseEntity<String> handle(AppointmentException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }




}

package com.HealthCare.HealthCare.exception;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

/**
 * Handles exceptions globally and returns consistent API error responses.
 */
@ControllerAdvice
public class GlobalExceptionHandler {

    /**
     * Handles ResourceNotFoundException and returns 404 response.
     */
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiErrorResponse> handleNotFound(ResourceNotFoundException ex,
                                                           HttpServletRequest request) {
        ApiErrorResponse response = new ApiErrorResponse(HttpStatus.NOT_FOUND, ex.getMessage(), request.getRequestURI());
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    /**
     * Handles all other exceptions and returns 500 response.
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiErrorResponse> handleAll(Exception ex, HttpServletRequest request) {
        ApiErrorResponse response = new ApiErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR,
                ex.getMessage(), request.getRequestURI());
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

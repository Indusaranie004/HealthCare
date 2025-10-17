package com.HealthCare.HealthCare.exception;

import com.HealthCare.HealthCare.dto.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    // ========== GOVERNMENT PAYMENT EXCEPTIONS ==========

    @ExceptionHandler(BillNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleBillNotFoundException(BillNotFoundException ex) {
        ErrorResponse error = new ErrorResponse(
                false,
                ex.getMessage(),
                "BILL_NOT_FOUND"
        );
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(InvalidGovernmentIdException.class)
    public ResponseEntity<ErrorResponse> handleInvalidGovernmentIdException(InvalidGovernmentIdException ex) {
        ErrorResponse error = new ErrorResponse(
                false,
                ex.getMessage(),
                "INVALID_GOVERNMENT_ID"
        );
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(GovernmentIdNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleGovernmentIdNotFoundException(GovernmentIdNotFoundException ex) {
        ErrorResponse error = new ErrorResponse(
                false,
                ex.getMessage(),
                "GOVERNMENT_ID_NOT_FOUND"
        );
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(PatientNotEligibleException.class)
    public ResponseEntity<ErrorResponse> handlePatientNotEligibleException(PatientNotEligibleException ex) {
        ErrorResponse error = new ErrorResponse(
                false,
                ex.getMessage(),
                "PATIENT_NOT_ELIGIBLE"
        );
        return new ResponseEntity<>(error, HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(InvalidPaymentAmountException.class)
    public ResponseEntity<ErrorResponse> handleInvalidPaymentAmountException(InvalidPaymentAmountException ex) {
        ErrorResponse error = new ErrorResponse(
                false,
                ex.getMessage(),
                "INVALID_PAYMENT_AMOUNT"
        );
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(FundLimitExceededException.class)
    public ResponseEntity<ErrorResponse> handleFundLimitExceededException(FundLimitExceededException ex) {
        ErrorResponse error = new ErrorResponse(
                false,
                ex.getMessage(),
                "FUND_LIMIT_EXCEEDED"
        );
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(IneligibleServiceException.class)
    public ResponseEntity<ErrorResponse> handleIneligibleServiceException(IneligibleServiceException ex) {
        ErrorResponse error = new ErrorResponse(
                false,
                ex.getMessage(),
                "INELIGIBLE_SERVICE"
        );
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(GovernmentPaymentRejectedException.class)
    public ResponseEntity<ErrorResponse> handleGovernmentPaymentRejectedException(GovernmentPaymentRejectedException ex) {
        ErrorResponse error = new ErrorResponse(
                false,
                ex.getMessage(),
                "PAYMENT_REJECTED"
        );
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(InvalidHospitalTypeException.class)
    public ResponseEntity<ErrorResponse> handleInvalidHospitalTypeException(InvalidHospitalTypeException ex) {
        ErrorResponse error = new ErrorResponse(
                false,
                ex.getMessage(),
                "INVALID_HOSPITAL_TYPE"
        );
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    // ========== INSURANCE PAYMENT EXCEPTIONS ==========

    @ExceptionHandler(InvalidPolicyNumberException.class)
    public ResponseEntity<ErrorResponse> handleInvalidPolicyNumberException(InvalidPolicyNumberException ex) {
        ErrorResponse error = new ErrorResponse(
                false,
                ex.getMessage(),
                "INVALID_POLICY_NUMBER"
        );
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(PolicyNotFoundException.class)
    public ResponseEntity<ErrorResponse> handlePolicyNotFoundException(PolicyNotFoundException ex) {
        ErrorResponse error = new ErrorResponse(
                false,
                ex.getMessage(),
                "POLICY_NOT_FOUND"
        );
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(InactivePolicyException.class)
    public ResponseEntity<ErrorResponse> handleInactivePolicyException(InactivePolicyException ex) {
        ErrorResponse error = new ErrorResponse(
                false,
                ex.getMessage(),
                "INACTIVE_POLICY"
        );
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(InvalidInsurerException.class)
    public ResponseEntity<ErrorResponse> handleInvalidInsurerException(InvalidInsurerException ex) {
        ErrorResponse error = new ErrorResponse(
                false,
                ex.getMessage(),
                "INVALID_INSURER"
        );
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ClaimAmountExceedsLimitException.class)
    public ResponseEntity<ErrorResponse> handleClaimAmountExceedsLimitException(ClaimAmountExceedsLimitException ex) {
        ErrorResponse error = new ErrorResponse(
                false,
                ex.getMessage(),
                "CLAIM_AMOUNT_EXCEEDS_LIMIT"
        );
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(InvalidClaimDateException.class)
    public ResponseEntity<ErrorResponse> handleInvalidClaimDateException(InvalidClaimDateException ex) {
        ErrorResponse error = new ErrorResponse(
                false,
                ex.getMessage(),
                "INVALID_CLAIM_DATE"
        );
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ClaimOutsidePolicyPeriodException.class)
    public ResponseEntity<ErrorResponse> handleClaimOutsidePolicyPeriodException(ClaimOutsidePolicyPeriodException ex) {
        ErrorResponse error = new ErrorResponse(
                false,
                ex.getMessage(),
                "CLAIM_OUTSIDE_POLICY_PERIOD"
        );
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(InsuranceClaimRejectedException.class)
    public ResponseEntity<ErrorResponse> handleInsuranceClaimRejectedException(InsuranceClaimRejectedException ex) {
        ErrorResponse error = new ErrorResponse(
                false,
                ex.getMessage(),
                "INSURANCE_CLAIM_REJECTED"
        );
        return new ResponseEntity<>(error, HttpStatus.PAYMENT_REQUIRED);
    }

    // ========== GENERIC EXCEPTION ==========

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGenericException(Exception ex) {
        String msg = ex.getMessage();
        if (msg == null || msg.trim().isEmpty()) {
            msg = ex.getClass().getSimpleName();
        }
        ErrorResponse error = new ErrorResponse(
                false,
                "An unexpected error occurred: " + msg,
                "INTERNAL_SERVER_ERROR"
        );
        return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
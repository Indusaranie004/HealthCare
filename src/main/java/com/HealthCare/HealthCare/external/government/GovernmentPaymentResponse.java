package com.HealthCare.HealthCare.external.government;

public class GovernmentPaymentResponse {
    private Boolean approvalStatus;
    private Float approvedAmount;
    private String message;

    public GovernmentPaymentResponse(Boolean approvalStatus, Float approvedAmount, String message) {
        this.approvalStatus = approvalStatus;
        this.approvedAmount = approvedAmount;
        this.message = message;
    }

    public Boolean getApprovalStatus() {
        return approvalStatus;
    }

    public void setApprovalStatus(Boolean approvalStatus) {
        this.approvalStatus = approvalStatus;
    }

    public Float getApprovedAmount() {
        return approvedAmount;
    }

    public void setApprovedAmount(Float approvedAmount) {
        this.approvedAmount = approvedAmount;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
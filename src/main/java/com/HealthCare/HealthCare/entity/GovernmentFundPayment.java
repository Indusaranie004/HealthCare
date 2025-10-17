package com.HealthCare.HealthCare.entity;

import jakarta.persistence.*;

@Entity
public class GovernmentFundPayment extends Payment {

    private String fundSource;
    private Float reqAmount;
    private String governmentId;
    private Boolean approvalStatus;
    private Float approvedAmount;

    @Override
    public void makePayment() {
        this.setMethod("Government Fund");
    }

    public Boolean governmentFundReq() {
        // Validates if request was successful after API call
        return approvalStatus != null && approvalStatus;
    }

    public Boolean governmentFundVerified() {
        // Verifies if government fund eligibility is confirmed
        return governmentId != null && !governmentId.isEmpty() && approvalStatus;
    }

    public Boolean issEssential() {
        // Checks if the service/treatment is essential for government funding
        return fundSource != null && fundSource.contains("Health");
    }

    public void setStatus() {
        // Set payment status based on approval
        if (approvalStatus != null && approvalStatus) {
            this.setMethod("Government Fund - Approved");
        } else {
            this.setMethod("Government Fund - Rejected");
        }
    }

    // Getters and Setters
    public String getFundSource() {
        return fundSource;
    }

    public void setFundSource(String fundSource) {
        this.fundSource = fundSource;
    }

    public Float getReqAmount() {
        return reqAmount;
    }

    public void setReqAmount(Float reqAmount) {
        this.reqAmount = reqAmount;
    }

    public String getGovernmentId() {
        return governmentId;
    }

    public void setGovernmentId(String governmentId) {
        this.governmentId = governmentId;
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
}
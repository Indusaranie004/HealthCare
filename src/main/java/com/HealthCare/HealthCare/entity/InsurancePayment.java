package com.HealthCare.HealthCare.entity;

import jakarta.persistence.*;
import java.util.Date;
import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
public class InsurancePayment extends Payment {

    private Integer claimId;
    private String insurer;
    private String policyNumber;
    private Float claimAmount;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date claimDate;
    private Boolean claimStatus;
    private Float approvedAmount;

    @ManyToOne
    @JoinColumn(name = "insurance_id")
    private Insurance insurance;

    @Override
    public void makePayment() {
        this.setMethod("Insurance");
    }

    public Boolean insuranceClaimReq() {
        // Validates if claim request was successful after API call
        return claimStatus != null && claimStatus;
    }

    public Boolean insuranceClaimVerified() {
        // Verifies if insurance claim eligibility is confirmed
        return policyNumber != null && !policyNumber.isEmpty() && claimStatus;
    }

    public void setStatus() {
        // Set payment status based on claim approval
        if (claimStatus != null && claimStatus) {
            this.setStatus("PAID");
        } else {
            this.setStatus("REJECTED");
        }
    }

    public void setAmount() {
        // Set final payment amount based on approved amount
        if (approvedAmount != null) {
            super.setAmount(approvedAmount);
        }
    }

    // Getters and Setters
    public Integer getClaimId() {
        return claimId;
    }

    public void setClaimId(Integer claimId) {
        this.claimId = claimId;
    }

    public String getInsurer() {
        return insurer;
    }

    public void setInsurer(String insurer) {
        this.insurer = insurer;
    }

    public String getPolicyNumber() {
        return policyNumber;
    }

    public void setPolicyNumber(String policyNumber) {
        this.policyNumber = policyNumber;
    }

    public Float getClaimAmount() {
        return claimAmount;
    }

    public void setClaimAmount(Float claimAmount) {
        this.claimAmount = claimAmount;
    }

    public Date getClaimDate() {
        return claimDate;
    }

    public void setClaimDate(Date claimDate) {
        this.claimDate = claimDate;
    }

    public Boolean getClaimStatus() {
        return claimStatus;
    }

    public void setClaimStatus(Boolean claimStatus) {
        this.claimStatus = claimStatus;
    }

    public Float getApprovedAmount() {
        return approvedAmount;
    }

    public void setApprovedAmount(Float approvedAmount) {
        this.approvedAmount = approvedAmount;
    }

    public Insurance getInsurance() {
        return insurance;
    }

    public void setInsurance(Insurance insurance) {
        this.insurance = insurance;
    }
}
// ============================================
// UPDATED PaymentRequest DTO with Insurance Fields
// Path: src/main/java/com/HealthCare/HealthCare/dto/PaymentRequest.java
// ============================================
package com.HealthCare.HealthCare.dto;

public class PaymentRequest {
    // Common fields
    private String billId;
    private String paymentType; // "government", "insurance", "card"
    private Float amount;

    // ========== GOVERNMENT PAYMENT FIELDS ==========
    private String fundSource;
    private Float reqAmount;
    private String governmentId;

    // ========== INSURANCE PAYMENT FIELDS ==========
    private Integer claimId;
    private String insurer;
    private String policyNumber;
    private Float claimAmount;
    private Long claimDate; // Epoch date

    // ========== CARD PAYMENT FIELDS ==========
    private String cardNumber;
    private String expiryDate;
    private String cvv;

    // ========== GETTERS AND SETTERS ==========

    // Common
    public String getBillId() {
        return billId;
    }

    public void setBillId(String billId) {
        this.billId = billId;
    }

    public String getPaymentType() {
        return paymentType;
    }

    public void setPaymentType(String paymentType) {
        this.paymentType = paymentType;
    }

    public Float getAmount() {
        return amount;
    }

    public void setAmount(Float amount) {
        this.amount = amount;
    }

    // Government Payment
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

    // Insurance Payment
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

    public Long getClaimDate() {
        return claimDate;
    }

    public void setClaimDate(Long claimDate) {
        this.claimDate = claimDate;
    }

    // Card Payment
    public String getCardNumber() {
        return cardNumber;
    }

    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    public String getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(String expiryDate) {
        this.expiryDate = expiryDate;
    }

    public String getCvv() {
        return cvv;
    }

    public void setCvv(String cvv) {
        this.cvv = cvv;
    }
}
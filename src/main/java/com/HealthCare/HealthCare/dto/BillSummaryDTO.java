package com.HealthCare.HealthCare.dto;

import java.util.Date;

public class BillSummaryDTO {
    private Long billId;
    private String hospitalName;
    private String hospitalLocation;
    private Date issuedAt;
    private Float amount;

    public BillSummaryDTO(Long billId, String hospitalName, String hospitalLocation, Date issuedAt, Float amount) {
        this.billId = billId;
        this.hospitalName = hospitalName;
        this.hospitalLocation = hospitalLocation;
        this.issuedAt = issuedAt;
        this.amount = amount;
    }

    // Getters and Setters
    public Long getBillId() {
        return billId;
    }

    public void setBillId(Long billId) {
        this.billId = billId;
    }

    public String getHospitalName() {
        return hospitalName;
    }

    public void setHospitalName(String hospitalName) {
        this.hospitalName = hospitalName;
    }

    public String getHospitalLocation() {
        return hospitalLocation;
    }

    public void setHospitalLocation(String hospitalLocation) {
        this.hospitalLocation = hospitalLocation;
    }

    public Date getIssuedAt() {
        return issuedAt;
    }

    public void setIssuedAt(Date issuedAt) {
        this.issuedAt = issuedAt;
    }

    public Float getAmount() {
        return amount;
    }

    public void setAmount(Float amount) {
        this.amount = amount;
    }
}
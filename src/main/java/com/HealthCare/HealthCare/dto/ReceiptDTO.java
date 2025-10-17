package com.HealthCare.HealthCare.dto;

import java.util.Date;

public class ReceiptDTO {
    private Long receiptId; // use paymentId as receipt id
    private Long billId;
    private String status;
    private String method;
    private Float amount;
    private Date paidAt;
    private String hospitalName;
    private String hospitalLocation;

    public ReceiptDTO() {}

    public ReceiptDTO(Long receiptId, Long billId, String status, String method, Float amount, Date paidAt,
                      String hospitalName, String hospitalLocation) {
        this.receiptId = receiptId;
        this.billId = billId;
        this.status = status;
        this.method = method;
        this.amount = amount;
        this.paidAt = paidAt;
        this.hospitalName = hospitalName;
        this.hospitalLocation = hospitalLocation;
    }

    public Long getReceiptId() { return receiptId; }
    public void setReceiptId(Long receiptId) { this.receiptId = receiptId; }
    public Long getBillId() { return billId; }
    public void setBillId(Long billId) { this.billId = billId; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getMethod() { return method; }
    public void setMethod(String method) { this.method = method; }
    public Float getAmount() { return amount; }
    public void setAmount(Float amount) { this.amount = amount; }
    public Date getPaidAt() { return paidAt; }
    public void setPaidAt(Date paidAt) { this.paidAt = paidAt; }
    public String getHospitalName() { return hospitalName; }
    public void setHospitalName(String hospitalName) { this.hospitalName = hospitalName; }
    public String getHospitalLocation() { return hospitalLocation; }
    public void setHospitalLocation(String hospitalLocation) { this.hospitalLocation = hospitalLocation; }
}



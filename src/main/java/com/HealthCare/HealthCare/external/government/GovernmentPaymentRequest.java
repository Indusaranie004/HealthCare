package com.HealthCare.HealthCare.external.government;

public class GovernmentPaymentRequest {
    private String fundSource;
    private Float reqAmount;
    private String governmentId;

    public GovernmentPaymentRequest(String fundSource, Float reqAmount, String governmentId) {
        this.fundSource = fundSource;
        this.reqAmount = reqAmount;
        this.governmentId = governmentId;
    }

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
}
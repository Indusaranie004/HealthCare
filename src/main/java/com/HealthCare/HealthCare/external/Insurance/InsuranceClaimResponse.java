package com.HealthCare.HealthCare.external.Insurance;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InsuranceClaimResponse {
    private Boolean status;
    private Float approvedAmount;
    private String message;
}
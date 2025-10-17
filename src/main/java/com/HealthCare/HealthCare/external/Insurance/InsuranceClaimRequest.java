package com.HealthCare.HealthCare.external.Insurance;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InsuranceClaimRequest {
    private Integer claimId;
    private String insurer;
    private String policyNumber;
    private Float claimAmount;
    private Long claimDate;
}

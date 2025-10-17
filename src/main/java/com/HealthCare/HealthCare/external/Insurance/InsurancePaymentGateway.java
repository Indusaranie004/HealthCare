package com.HealthCare.HealthCare.external.Insurance;

import com.HealthCare.HealthCare.entity.Insurance;
import com.HealthCare.HealthCare.exception.*;
import com.HealthCare.HealthCare.repository.InsuranceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Component
public class InsurancePaymentGateway {

    @Autowired
    private InsuranceRepository insuranceRepository;

    private static final List<String> VALID_INSURERS = Arrays.asList(
            "AIA", "Ceylinco", "Allianz", "Union Assurance"
    );

    public InsuranceClaimResponse processClaim(InsuranceClaimRequest request) {

        // 1. Validate policy number format (INS + 8 digits)
        if (!request.getPolicyNumber().matches("INS\\d{8}")) {
            throw new InvalidPolicyNumberException("Invalid policy number format. Expected format: INS########");
        }

        // 2. Validate insurer
        if (!VALID_INSURERS.contains(request.getInsurer())) {
            throw new InvalidInsurerException("Insurer not supported. Valid insurers: " + VALID_INSURERS);
        }

        // 3. Check if policy exists
        Optional<Insurance> insuranceOpt = insuranceRepository.findByPolicyNumber(request.getPolicyNumber());
        if (insuranceOpt.isEmpty()) {
            throw new PolicyNotFoundException("Policy number not found: " + request.getPolicyNumber());
        }

        Insurance insurance = insuranceOpt.get();

        // 4. Check if policy is active
        if (!insurance.getActive()) {
            throw new InactivePolicyException("Policy is not active");
        }

        // 5. Validate claim amount
        if (request.getClaimAmount() == null || request.getClaimAmount() <= 0) {
            throw new InvalidClaimDateException("Invalid claim amount");
        }

        // 6. Check coverage limit
        if (request.getClaimAmount() > insurance.getCoverageLimit()) {
            throw new ClaimAmountExceedsLimitException(
                    "Claim amount exceeds coverage limit of " + insurance.getCoverageLimit()
            );
        }

        // 7. Use current date as claim date
        LocalDate claimDateObj = LocalDate.now();

        // 8. Check policy validity period
        LocalDate startDate = insurance.getStartDate().toInstant()
                .atZone(ZoneId.systemDefault()).toLocalDate();
        LocalDate endDate = insurance.getEndDate().toInstant()
                .atZone(ZoneId.systemDefault()).toLocalDate();

        if (claimDateObj.isBefore(startDate) || claimDateObj.isAfter(endDate)) {
            throw new ClaimOutsidePolicyPeriodException(
                    "Claim date outside policy validity period (" + startDate + " to " + endDate + ")"
            );
        }

        // 9. Calculate approved amount based on coverage percentage
        Float coveragePercentage = insurance.getCoveragePercentage();
        Float approvedAmount = request.getClaimAmount() * (coveragePercentage / 100);

        // Cap at coverage limit
        if (approvedAmount > insurance.getCoverageLimit()) {
            approvedAmount = insurance.getCoverageLimit();
        }

        // 10. Return successful response
        return new InsuranceClaimResponse(true, approvedAmount, "Claim approved");
    }
}
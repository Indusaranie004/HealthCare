package com.HealthCare.HealthCare.external.government;

import com.HealthCare.HealthCare.constants.GovernmentFundConstants;
import com.HealthCare.HealthCare.entity.Government;
import com.HealthCare.HealthCare.repository.GovernmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class MockGovernmentPaymentGateway implements GovernmentPaymentGateway {

    @Autowired
    private GovernmentRepository governmentRepository;

    @Override
    public GovernmentPaymentResponse processPayment(GovernmentPaymentRequest request) {
        // Validation 1: Check if governmentId format is valid
        if (request.getGovernmentId() == null ||
                !request.getGovernmentId().matches(GovernmentFundConstants.GOVERNMENT_ID_PATTERN)) {
            return new GovernmentPaymentResponse(
                    false,
                    0.0f,
                    "Invalid government ID format"
            );
        }

        // Validation 2: Check if governmentId exists in database
        Optional<Government> govOpt = governmentRepository.findByGovernmentId(request.getGovernmentId());
        if (govOpt.isEmpty()) {
            return new GovernmentPaymentResponse(
                    false,
                    0.0f,
                    "Government ID not found in system"
            );
        }

        Government government = govOpt.get();

        // Validation 3: Check if patient is eligible
        if (government.getEligible() == null || !government.getEligible()) {
            return new GovernmentPaymentResponse(
                    false,
                    0.0f,
                    "Patient not eligible for government funding"
            );
        }

        // Validation 4: Check if amount is valid
        if (request.getReqAmount() == null || request.getReqAmount() <= 0) {
            return new GovernmentPaymentResponse(
                    false,
                    0.0f,
                    "Invalid payment amount"
            );
        }

        // Validation 5: Check fund limit
        if (request.getReqAmount() > GovernmentFundConstants.MAX_FUND_LIMIT) {
            return new GovernmentPaymentResponse(
                    false,
                    0.0f,
                    "Amount exceeds government fund limit of " + GovernmentFundConstants.MAX_FUND_LIMIT
            );
        }

        // All validations passed - approve payment
        return new GovernmentPaymentResponse(
                true,
                request.getReqAmount(),
                "Payment approved by government fund"
        );
    }
}
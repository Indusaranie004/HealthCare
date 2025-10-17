package com.HealthCare.HealthCare.external.government;

public interface GovernmentPaymentGateway {
    GovernmentPaymentResponse processPayment(GovernmentPaymentRequest request);
}
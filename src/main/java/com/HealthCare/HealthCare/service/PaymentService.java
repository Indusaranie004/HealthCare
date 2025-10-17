package com.HealthCare.HealthCare.service;

import com.HealthCare.HealthCare.dto.PaymentRequest;
import com.HealthCare.HealthCare.entity.*;
import com.HealthCare.HealthCare.external.government.GovernmentPaymentGateway;
import com.HealthCare.HealthCare.external.government.GovernmentPaymentRequest;
import com.HealthCare.HealthCare.external.government.GovernmentPaymentResponse;
import com.HealthCare.HealthCare.repository.BillRepository;
import com.HealthCare.HealthCare.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.Optional;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private BillRepository billRepository;

    @Autowired
    private GovernmentPaymentGateway governmentPaymentGateway;

    @Transactional
    public Payment processPayment(PaymentRequest request) {
        Optional<Bill> billOpt = billRepository.findById(request.getBillId());
        if (billOpt.isEmpty()) {
            throw new RuntimeException("Bill not found");
        }

        Bill bill = billOpt.get();
        Hospital hospital = bill.getHospital();

        Payment payment = null;

        if ("Government".equalsIgnoreCase(hospital.getType())) {
            payment = createGovernmentPayment(request, bill);
        }
        /* COMMENTED OUT FOR NOW - WILL IMPLEMENT LATER
        else if ("Private".equalsIgnoreCase(hospital.getType())) {
            if ("insurance".equalsIgnoreCase(request.getPaymentType())) {
                payment = createInsurancePayment(request, bill);
            } else if ("card".equalsIgnoreCase(request.getPaymentType())) {
                payment = createCardPayment(request, bill);
            } else {
                throw new RuntimeException("Invalid payment type for private hospital");
            }
        }
        */
        else {
            throw new RuntimeException("Only government hospital payments are currently supported");
        }

        payment.makePayment();
        payment = paymentRepository.save(payment);

        bill.setStatus("paid");
        billRepository.save(bill);

        return payment;
    }

    private GovernmentFundPayment createGovernmentPayment(PaymentRequest request, Bill bill) {
        // Step 1: Create payment entity with request data
        GovernmentFundPayment payment = new GovernmentFundPayment();
        payment.setBill(bill);
        payment.setFundSource(request.getFundSource());
        payment.setReqAmount(request.getReqAmount());
        payment.setGovernmentId(request.getGovernmentId());

        // Step 2: Verify essential service eligibility
        if (!payment.issEssential()) {
            throw new RuntimeException("Service not eligible for government funding");
        }

        // Step 3: Create external API request
        GovernmentPaymentRequest govRequest = new GovernmentPaymentRequest(
                payment.getFundSource(),
                payment.getReqAmount(),
                payment.getGovernmentId()
        );

        // Step 4: Send request to external API (governmentFundReq conceptually)
        GovernmentPaymentResponse govResponse = governmentPaymentGateway.processPayment(govRequest);

        // Step 5: Process response
        payment.setApprovalStatus(govResponse.getApprovalStatus());
        payment.setApprovedAmount(govResponse.getApprovedAmount());
        payment.setAmount(govResponse.getApprovedAmount());
        payment.setPaidAt(new Date());

        // Step 6: Verify government fund status
        if (!payment.governmentFundVerified()) {
            throw new RuntimeException("Government payment rejected: " + govResponse.getMessage());
        }

        // Step 7: Set final status
        payment.setStatus();

        return payment;
    }

    /* COMMENTED OUT - TO BE IMPLEMENTED LATER
    private InsurancePayment createInsurancePayment(PaymentRequest request, Bill bill) {
        InsurancePayment payment = new InsurancePayment();
        payment.setBill(bill);
        payment.setAmount(request.getAmount());
        payment.setPaidAt(new Date());
        return payment;
    }

    private CardPayment createCardPayment(PaymentRequest request, Bill bill) {
        CardPayment payment = new CardPayment();
        payment.setBill(bill);
        payment.setAmount(request.getAmount());
        payment.setPaidAt(new Date());
        return payment;
    }
    */
}
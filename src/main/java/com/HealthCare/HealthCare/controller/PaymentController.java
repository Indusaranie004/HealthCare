package com.HealthCare.HealthCare.controller;

import com.HealthCare.HealthCare.dto.PaymentRequest;
import com.HealthCare.HealthCare.entity.Payment;
import com.HealthCare.HealthCare.dto.ReceiptDTO;
import com.HealthCare.HealthCare.repository.PaymentRepository;
import com.HealthCare.HealthCare.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private PaymentRepository paymentRepository;

    @PostMapping("/process")
    public ResponseEntity<?> processPayment(@RequestBody PaymentRequest request) {
        // No try-catch here - let GlobalExceptionHandler handle exceptions
        Payment payment = paymentService.processPayment(request);
        ReceiptDTO receipt = paymentService.buildReceipt(payment);
        return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Payment processed successfully",
                "paymentId", payment.getPaymentId(),
                "receipt", receipt
        ));
    }

    @GetMapping("/receipt/{paymentId}")
    public ResponseEntity<?> getReceipt(@PathVariable Long paymentId) {
        return paymentRepository.findById(paymentId)
                .map(p -> ResponseEntity.ok(paymentService.buildReceipt(p)))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/receipt/{paymentId}/download")
    public ResponseEntity<?> downloadReceipt(@PathVariable Long paymentId) {
        return paymentRepository.findById(paymentId)
                .map(p -> {
                    byte[] pdf = paymentService.generateReceiptPdf(p);
                    return ResponseEntity.ok()
                            .header("Content-Disposition", "attachment; filename=receipt-" + paymentId + ".pdf")
                            .header("Content-Type", "application/pdf")
                            .body(pdf);
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
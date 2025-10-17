package com.HealthCare.HealthCare.controller;

import com.HealthCare.HealthCare.dto.BillSummaryDTO;
import com.HealthCare.HealthCare.entity.Bill;
import com.HealthCare.HealthCare.service.BillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/bills")
public class BillController {

    @Autowired
    private BillService billService;

    @GetMapping("/patient/{patientId}/unsettled")
    public ResponseEntity<List<BillSummaryDTO>> getUnsettledBills(@PathVariable Long patientId) {
        List<BillSummaryDTO> bills = billService.getUnsettledBillsSummary(patientId);
        return ResponseEntity.ok(bills);
    }

    @GetMapping("/{billId}")
    public ResponseEntity<Bill> getBillDetails(@PathVariable Long billId) {
        Optional<Bill> bill = billService.getBillDetails(billId);
        return bill.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
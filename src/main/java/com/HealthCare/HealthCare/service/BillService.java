package com.HealthCare.HealthCare.service;

import com.HealthCare.HealthCare.dto.BillSummaryDTO;
import com.HealthCare.HealthCare.entity.Bill;
import com.HealthCare.HealthCare.repository.BillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BillService {

    @Autowired
    private BillRepository billRepository;

    public List<BillSummaryDTO> getUnsettledBillsSummary(Long patientId) {
        List<Bill> bills = billRepository.findByPatient_PatientIdAndStatus(patientId, "unpaid");

        return bills.stream()
                .map(bill -> new BillSummaryDTO(
                        bill.getBillId(),
                        bill.getHospital().getName(),
                        bill.getHospital().getLocation(),
                        bill.getIssuedAt(),
                        bill.getAmount()
                ))
                .collect(Collectors.toList());
    }

    public Optional<Bill> getBillDetails(Long billId) {
        return billRepository.findById(billId);
    }
}
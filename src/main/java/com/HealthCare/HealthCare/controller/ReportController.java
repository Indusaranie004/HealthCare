package com.HealthCare.HealthCare.controller;

import com.HealthCare.HealthCare.dto.*;
import com.HealthCare.HealthCare.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
public class ReportController {

    private final ReportService reportService;

    @GetMapping("/patients")
    public ResponseEntity<List<PatientReportDto>> getPatientReport(@RequestParam Long hospitalId) {
        return ResponseEntity.ok(reportService.generatePatientReport(hospitalId));
    }

    @GetMapping("/finance")
    public ResponseEntity<FinanceReportDto> getFinanceReport(@RequestParam Long hospitalId) {
        return ResponseEntity.ok(reportService.generateFinanceReport(hospitalId));
    }

    @GetMapping("/peak-time")
    public ResponseEntity<List<PeakTimeReportDto>> getPeakTimeReport(@RequestParam Long hospitalId) {
        return ResponseEntity.ok(reportService.generatePeakTimeReport(hospitalId));
    }
}
package com.HealthCare.HealthCare.medicalrecords.controller;

import com.HealthCare.HealthCare.medicalrecords.dto.*;
import com.HealthCare.HealthCare.medicalrecords.service.MedicalRecordService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/medical-records")
public class MedicalRecordController {

    private final MedicalRecordService medicalRecordService;

    public MedicalRecordController(MedicalRecordService medicalRecordService) {
        this.medicalRecordService = medicalRecordService;
    }

    @PostMapping
    public MedicalRecordResponse create(@RequestBody MedicalRecordRequest request) {
        return medicalRecordService.createMedicalRecord(request);
    }

    @GetMapping
    public List<MedicalRecordResponse> getAll() {
        return medicalRecordService.getAllMedicalRecords();
    }

    @GetMapping("/patient/{patientId}")
    public List<MedicalRecordResponse> getByPatient(@PathVariable("patientId") Long patientId) {
        return medicalRecordService.getAllByPatientId(patientId);
    }


    @PutMapping("/{recordId}")
    public MedicalRecordResponse update(
            @PathVariable("recordId") Long recordId,
            @RequestBody MedicalRecordRequest request) {
        return medicalRecordService.updateMedicalRecord(recordId, request);
    }

    @DeleteMapping("/{recordId}")
    public void delete(@PathVariable("recordId") Long recordId) {
        medicalRecordService.deleteMedicalRecord(recordId);
    }

    // FIXED: Explicit @RequestParam names
    @GetMapping("/search")
    public List<MedicalRecordResponse> search(
            @RequestParam(value = "demographic", required = false) String demographic,
            @RequestParam(value = "alleges", required = false) String alleges,
            @RequestParam(value = "chronicCondition", required = false) String chronicCondition,
            @RequestParam(value = "pastSurgeries", required = false) String pastSurgeries,
            @RequestParam(value = "patientId", required = false) Long patientId) {
        return medicalRecordService.searchMedicalRecords(demographic, alleges, chronicCondition, pastSurgeries, patientId);
    }

}

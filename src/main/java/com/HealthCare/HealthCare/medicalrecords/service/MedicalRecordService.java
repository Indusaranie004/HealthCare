package com.HealthCare.HealthCare.medicalrecords.service;

import com.HealthCare.HealthCare.medicalrecords.dto.*;
import com.HealthCare.HealthCare.medicalrecords.model.*;
import com.HealthCare.HealthCare.medicalrecords.repository.*;
import com.HealthCare.HealthCare.patient.model.Patient;
import com.HealthCare.HealthCare.patient.repository.PatientRepository;
import com.HealthCare.HealthCare.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service

public class MedicalRecordService {

    private final MedicalRecordRepository medicalRecordRepository;
    private final TreatmentPlanRepository treatmentPlanRepository;
    private final PatientRepository patientRepository;

    public MedicalRecordService(MedicalRecordRepository medicalRecordRepository,
                                TreatmentPlanRepository treatmentPlanRepository,
                                PatientRepository patientRepository) {
        this.medicalRecordRepository = medicalRecordRepository;
        this.treatmentPlanRepository = treatmentPlanRepository;
        this.patientRepository = patientRepository;
    }

    public MedicalRecordResponse createMedicalRecord(MedicalRecordRequest request) {
        Patient patient = patientRepository.findById(request.getPatientId())
                .orElseThrow(() -> new ResourceNotFoundException("Patient not found"));

        MedicalRecord record = MedicalRecord.builder()
                .demographic(request.getDemographic())
                .alleges(request.getAlleges())
                .chronicCondition(request.getChronicCondition())
                .pastSurgeries(request.getPastSurgeries())
                .patient(patient)
                .build();

        if (request.getTreatmentPlans() != null) {
            List<TreatmentPlan> plans = request.getTreatmentPlans().stream().map(tpReq ->
                    TreatmentPlan.builder()
                            .currentMedication(tpReq.getCurrentMedication())
                            .futureAppointments(tpReq.getFutureAppointments())
                            .treatmentNote(tpReq.getTreatmentNote())
                            .medicalRecord(record)
                            .build()
            ).collect(Collectors.toList());
            record.setTreatmentPlans(plans);
        }

        MedicalRecord saved = medicalRecordRepository.save(record);
        return mapToResponse(saved);
    }

    public List<MedicalRecordResponse> getAllMedicalRecords() {
        return medicalRecordRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<MedicalRecordResponse> getAllByPatientId(Long patientId) {
        return medicalRecordRepository.findByPatientPatientId(patientId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }


    public MedicalRecordResponse updateMedicalRecord(Long recordId, MedicalRecordRequest request) {
        // 1. Fetch the existing record (ensures it's managed)
        MedicalRecord record = medicalRecordRepository.findById(recordId)
                .orElseThrow(() -> new ResourceNotFoundException("MedicalRecord not found"));

        // 2. Update scalar fields
        record.setDemographic(request.getDemographic());
        record.setAlleges(request.getAlleges());
        record.setChronicCondition(request.getChronicCondition());
        record.setPastSurgeries(request.getPastSurgeries());

        // 3. Get current treatment plan IDs to delete
        List<Long> existingPlanIds = record.getTreatmentPlans() != null ? // ✅ ADDED NULL CHECK
                record.getTreatmentPlans().stream()
                        .map(TreatmentPlan::getTreatmentId)
                        .collect(Collectors.toList()) : java.util.Collections.emptyList();

        // 4. Delete old treatment plans explicitly
        if (!existingPlanIds.isEmpty()) {
            treatmentPlanRepository.deleteAllById(existingPlanIds);
            if (record.getTreatmentPlans() != null) { // ✅ ADDED NULL CHECK
                record.getTreatmentPlans().clear(); // now safe to clear
            }
        }

        // 5. Create and link new treatment plans
        if (request.getTreatmentPlans() != null && !request.getTreatmentPlans().isEmpty()) {
            List<TreatmentPlan> newPlans = request.getTreatmentPlans().stream()
                    .map(tp -> TreatmentPlan.builder()
                            .currentMedication(tp.getCurrentMedication())
                            .futureAppointments(tp.getFutureAppointments())
                            .treatmentNote(tp.getTreatmentNote())
                            .medicalRecord(record)
                            .build())
                    .collect(Collectors.toList());
            record.setTreatmentPlans(newPlans);
        }

        // 6. Save and return
        MedicalRecord saved = medicalRecordRepository.save(record);
        return mapToResponse(saved);
    }

    public void deleteMedicalRecord(Long recordId) {
        MedicalRecord record = medicalRecordRepository.findById(recordId)
                .orElseThrow(() -> new ResourceNotFoundException("MedicalRecord not found"));
        medicalRecordRepository.delete(record);
    }

    public List<MedicalRecordResponse> searchMedicalRecords(
            String demographic,
            String alleges,
            String chronicCondition,
            String pastSurgeries,
            Long patientId
    ) {
        return medicalRecordRepository.findAll().stream()
                .filter(r -> (demographic == null || r.getDemographic().toLowerCase().contains(demographic.toLowerCase())) &&
                        (alleges == null || r.getAlleges().toLowerCase().contains(alleges.toLowerCase())) &&
                        (chronicCondition == null || r.getChronicCondition().toLowerCase().contains(chronicCondition.toLowerCase())) &&
                        (pastSurgeries == null || r.getPastSurgeries().toLowerCase().contains(pastSurgeries.toLowerCase())) &&
                        (patientId == null || r.getPatient().getPatientId().equals(patientId)))
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }


    private MedicalRecordResponse mapToResponse(MedicalRecord record) {
        List<TreatmentPlanResponse> treatmentPlans = record.getTreatmentPlans() != null ? // ✅ ADDED NULL CHECK
                record.getTreatmentPlans().stream().map(tp ->
                        TreatmentPlanResponse.builder()
                                .treatmentId(tp.getTreatmentId())
                                .currentMedication(tp.getCurrentMedication())
                                .futureAppointments(tp.getFutureAppointments())
                                .treatmentNote(tp.getTreatmentNote())
                                .build()
                ).collect(Collectors.toList()) : java.util.Collections.emptyList();

        return MedicalRecordResponse.builder()
                .recordId(record.getRecordId())
                .demographic(record.getDemographic())
                .alleges(record.getAlleges())
                .chronicCondition(record.getChronicCondition())
                .pastSurgeries(record.getPastSurgeries())
                .patientId(record.getPatient().getPatientId())
                .treatmentPlans(treatmentPlans)
                .build();
    }
}
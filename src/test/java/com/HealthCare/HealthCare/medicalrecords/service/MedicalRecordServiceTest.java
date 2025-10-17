package com.HealthCare.HealthCare.medicalrecords.service;

import com.HealthCare.HealthCare.exception.ResourceNotFoundException;
import com.HealthCare.HealthCare.medicalrecords.dto.*;
import com.HealthCare.HealthCare.medicalrecords.model.MedicalRecord;
import com.HealthCare.HealthCare.medicalrecords.model.TreatmentPlan;
import com.HealthCare.HealthCare.medicalrecords.repository.MedicalRecordRepository;
import com.HealthCare.HealthCare.medicalrecords.repository.TreatmentPlanRepository;
import com.HealthCare.HealthCare.patient.model.Patient;
import com.HealthCare.HealthCare.patient.repository.PatientRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentMatcher;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;

import java.util.*;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.BDDMockito.*;

@ExtendWith(MockitoExtension.class)
@MockitoSettings(strictness = Strictness.LENIENT) // 👈 ADD THIS
class MedicalRecordServiceTest {

    @Mock
    private MedicalRecordRepository medicalRecordRepository;

    @Mock
    private TreatmentPlanRepository treatmentPlanRepository;

    @Mock
    private PatientRepository patientRepository;

    @InjectMocks
    private MedicalRecordService medicalRecordService;

    private Patient patient;
    private MedicalRecord medicalRecord;
    private TreatmentPlan treatmentPlan;

    @BeforeEach
    void setUp() {
        patient = Patient.builder()
                .patientId(3L)
                .firstName("Jane")
                .lastName("Doe")
                .build();

        treatmentPlan = TreatmentPlan.builder()
                .treatmentId(10L)
                .currentMedication("Fluticasone")
                .build();

        // CORRECT: Mutable list
        List<TreatmentPlan> plans = new ArrayList<>();
        plans.add(treatmentPlan);

        medicalRecord = MedicalRecord.builder()
                .recordId(5L)
                .patient(patient)
                .treatmentPlans(plans) // Not Arrays.asList()
                .build();

        treatmentPlan.setMedicalRecord(medicalRecord);
    }

    // ───────────────────────────────────────────────
    // CREATE TESTS
    // ───────────────────────────────────────────────

    @Test
    void createMedicalRecord_shouldCreateRecordAndTreatmentPlans_whenValidRequest() {
        MedicalRecordRequest request = createValidRequest();
        when(patientRepository.findById(3L)).thenReturn(Optional.of(patient));
        when(medicalRecordRepository.save(any(MedicalRecord.class)))
                .thenAnswer(inv -> {
                    MedicalRecord r = inv.getArgument(0);
                    r.setRecordId(100L);
                    return r;
                });

        MedicalRecordResponse response = medicalRecordService.createMedicalRecord(request);

        assertThat(response).isNotNull();
        assertThat(response.getRecordId()).isEqualTo(100L);
        assertThat(response.getPatientId()).isEqualTo(3L);
        assertThat(response.getChronicCondition()).isEqualTo("Mild asthma");
        assertThat(response.getTreatmentPlans()).hasSize(1);
        assertThat(response.getTreatmentPlans().get(0).getCurrentMedication())
                .isEqualTo("Fluticasone inhaler daily");

        verify(patientRepository).findById(3L);
        verify(medicalRecordRepository).save(any(MedicalRecord.class));
    }

    @Test
    void createMedicalRecord_shouldThrowException_whenPatientNotFound() {
        MedicalRecordRequest request = createValidRequest();
        when(patientRepository.findById(999L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> medicalRecordService.createMedicalRecord(request))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessage("Patient not found");

        verify(medicalRecordRepository, never()).save(any());
    }

    // ───────────────────────────────────────────────
    // UPDATE TESTS
    // ───────────────────────────────────────────────

    @Test
    void updateMedicalRecord_shouldReplaceTreatmentPlansAndReturnUpdatedRecord() {
        when(medicalRecordRepository.findById(5L)).thenReturn(Optional.of(medicalRecord));
        doNothing().when(treatmentPlanRepository).deleteAllById(argThat(new LongListContains(10L)));
        when(medicalRecordRepository.save(any(MedicalRecord.class)))
                .thenAnswer(inv -> inv.getArgument(0));

        TreatmentPlanRequest tpReq = TreatmentPlanRequest.builder()
                .currentMedication("New inhaler")
                .futureAppointments("2026-01-10")
                .treatmentNote("Updated plan")
                .build();

        MedicalRecordRequest updateRequest = MedicalRecordRequest.builder()
                .patientId(3L)
                .demographic("Updated Female, 28")
                .alleges("None")
                .chronicCondition("Controlled asthma")
                .pastSurgeries("Tonsillectomy")
                .treatmentPlans(Arrays.asList(tpReq))
                .build();

        MedicalRecordResponse response = medicalRecordService.updateMedicalRecord(5L, updateRequest);

        assertThat(response.getDemographic()).isEqualTo("Updated Female, 28");
        assertThat(response.getChronicCondition()).isEqualTo("Controlled asthma");
        assertThat(response.getTreatmentPlans()).hasSize(1);
        assertThat(response.getTreatmentPlans().get(0).getCurrentMedication())
                .isEqualTo("New inhaler");

        verify(treatmentPlanRepository).deleteAllById(argThat(new LongListContains(10L)));
        verify(medicalRecordRepository).save(any(MedicalRecord.class));
    }

    @Test
    void updateMedicalRecord_shouldDeleteAllTreatmentPlans_whenRequestHasEmptyList() {
        when(medicalRecordRepository.findById(5L)).thenReturn(Optional.of(medicalRecord));
        doNothing().when(treatmentPlanRepository).deleteAllById(argThat(new LongListContains(10L)));
        when(medicalRecordRepository.save(any())).thenAnswer(inv -> inv.getArgument(0));

        MedicalRecordRequest request = MedicalRecordRequest.builder()
                .patientId(3L)
                .demographic("No treatments")
                .treatmentPlans(new ArrayList<>()) // Java 8 compatible
                .build();

        MedicalRecordResponse response = medicalRecordService.updateMedicalRecord(5L, request);

        assertThat(response.getTreatmentPlans()).isEmpty();
        verify(treatmentPlanRepository).deleteAllById(argThat(new LongListContains(10L)));
    }

    @Test
    void updateMedicalRecord_shouldThrowException_whenRecordNotFound() {
        when(medicalRecordRepository.findById(999L)).thenReturn(Optional.empty());
        MedicalRecordRequest request = createValidRequest();

        assertThatThrownBy(() -> medicalRecordService.updateMedicalRecord(999L, request))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessage("MedicalRecord not found");

        verify(treatmentPlanRepository, never()).deleteAllById(any());
    }

    // ───────────────────────────────────────────────
    // DELETE TEST
    // ───────────────────────────────────────────────

    @Test
    void deleteMedicalRecord_shouldDeleteRecord_whenExists() {
        when(medicalRecordRepository.findById(5L)).thenReturn(Optional.of(medicalRecord));
        doNothing().when(medicalRecordRepository).delete(any(MedicalRecord.class));

        medicalRecordService.deleteMedicalRecord(5L);

        verify(medicalRecordRepository).delete(medicalRecord);
    }

    @Test
    void deleteMedicalRecord_shouldThrowException_whenRecordNotFound() {
        when(medicalRecordRepository.findById(999L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> medicalRecordService.deleteMedicalRecord(999L))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessage("MedicalRecord not found");
    }

    // ───────────────────────────────────────────────
    // SEARCH TEST
    // ───────────────────────────────────────────────

    @Test
    void searchMedicalRecords_shouldReturnMatchingRecords_caseInsensitive() {
        MedicalRecord record1 = MedicalRecord.builder()
                .recordId(1L)
                .patient(patient)
                .chronicCondition("Mild Asthma")
                .alleges("None")
                .build();
        MedicalRecord record2 = MedicalRecord.builder()
                .recordId(2L)
                .patient(patient)
                .chronicCondition("Diabetes")
                .alleges("Peanut allergy")
                .build();

        when(medicalRecordRepository.findAll()).thenReturn(Arrays.asList(record1, record2));

        List<MedicalRecordResponse> results = medicalRecordService.searchMedicalRecords(
                null, "none", "asthma", null, null
        );

        assertThat(results).hasSize(1);
        assertThat(results.get(0).getRecordId()).isEqualTo(1L);
        assertThat(results.get(0).getChronicCondition()).isEqualTo("Mild Asthma");
    }

    @Test
    void searchMedicalRecords_shouldReturnAllRecords_whenAllParamsNull() {
        when(medicalRecordRepository.findAll()).thenReturn(Arrays.asList(medicalRecord));

        List<MedicalRecordResponse> results = medicalRecordService.searchMedicalRecords(
                null, null, null, null, null
        );

        assertThat(results).hasSize(1);
    }

    // ───────────────────────────────────────────────
    // HELPER METHODS
    // ───────────────────────────────────────────────

    private MedicalRecordRequest createValidRequest() {
        TreatmentPlanRequest tpReq = TreatmentPlanRequest.builder()
                .currentMedication("Fluticasone inhaler daily")
                .futureAppointments("2026-01-10")
                .treatmentNote("Annual asthma review")
                .build();

        return MedicalRecordRequest.builder()
                .patientId(3L)
                .demographic("Female, 28 years")
                .alleges("None")
                .chronicCondition("Mild asthma")
                .pastSurgeries("Tonsillectomy")
                .treatmentPlans(Arrays.asList(tpReq)) // Java 8 compatible
                .build();
    }

    // Custom matcher for List<Long> containing a specific ID
    private static class LongListContains implements ArgumentMatcher<List<Long>> {
        private final Long expected;

        LongListContains(Long expected) {
            this.expected = expected;
        }

        @Override
        public boolean matches(List<Long> argument) {
            return argument != null && argument.contains(expected);
        }
    }
}
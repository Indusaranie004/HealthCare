package com.HealthCare.HealthCare.service;

import com.HealthCare.HealthCare.dto.*;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ReportServiceTest {

    @Mock
    private EntityManager entityManager;

    @Mock
    private Query query;

    @InjectMocks
    private ReportService reportService;

    @Test
    void generatePatientReport_returnsData() {
        // Arrange
        when(entityManager.createNativeQuery(anyString())).thenReturn(query);
        Object[] row = {1L, "John Doe", "Colombo Hospital", Timestamp.valueOf(LocalDateTime.now())};
        when(query.setParameter("hospitalId", 1L)).thenReturn(query);
        when(query.getResultList()).thenReturn(List.of(row));

        // Act
        List<PatientReportDto> result = reportService.generatePatientReport(1L);

        // Assert
        assertFalse(result.isEmpty());
        assertEquals("John Doe", result.get(0).getPatientName());
        verify(query, times(1)).getResultList();
    }

    @Test
    void generateFinanceReport_returnsZeroIfNoPayments() {
        // Arrange
        when(entityManager.createNativeQuery(anyString())).thenReturn(query);
        Object[] row = {"Colombo Hospital", BigDecimal.ZERO, java.sql.Date.valueOf(LocalDate.now())};
        when(query.setParameter("hospitalId", 1L)).thenReturn(query);
        when(query.getResultList()).thenReturn(List.of(row));

        // Act
        FinanceReportDto result = reportService.generateFinanceReport(1L);

        // Assert
        assertNotNull(result);
        assertEquals(BigDecimal.ZERO, result.getTotalRevenue());
        assertEquals("Colombo Hospital", result.getHospitalName());
    }

    @Test
    void generatePeakTimeReport_handlesEmptyData() {
        // Arrange
        when(entityManager.createNativeQuery(anyString())).thenReturn(query);
        when(query.setParameter("hospitalId", 1L)).thenReturn(query);
        when(query.getResultList()).thenReturn(List.of());

        // Act
        List<PeakTimeReportDto> result = reportService.generatePeakTimeReport(1L);

        // Assert
        assertTrue(result.isEmpty());
    }
}
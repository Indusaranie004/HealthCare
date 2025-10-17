package com.HealthCare.HealthCare.service;

import com.HealthCare.HealthCare.dto.*;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import java.sql.Date;

@Service
@RequiredArgsConstructor
public class ReportService {

    private final EntityManager entityManager;

    @SuppressWarnings("SqlResolve")
    public List<PatientReportDto> generatePatientReport(Long hospitalId) {
        String sql = """
            SELECT p.id, p.name, h.name, MAX(a.appointment_time)
            FROM patients p
            JOIN appointments a ON p.id = a.patient_id
            JOIN hospitals h ON a.hospital_id = h.id
            WHERE h.id = :hospitalId
            GROUP BY p.id, p.name, h.name
            ORDER BY MAX(a.appointment_time) DESC
            """;

        Query query = entityManager.createNativeQuery(sql);
        query.setParameter("hospitalId", hospitalId);

        @SuppressWarnings("unchecked")
        List<Object[]> results = query.getResultList();

        return results.stream().map(row -> {
            PatientReportDto dto = new PatientReportDto();
            dto.setPatientId(((Number) row[0]).longValue());
            dto.setPatientName((String) row[1]);
            dto.setHospitalName((String) row[2]);

            // ✅ Fix: Convert java.sql.Timestamp to java.time.LocalDateTime
            Timestamp timestamp = (Timestamp) row[3];
            LocalDateTime localDateTime = timestamp.toLocalDateTime();
            dto.setLastVisit(localDateTime.toLocalDate());

            return dto;
        }).collect(Collectors.toList());
    }
    @SuppressWarnings("SqlResolve")
    public FinanceReportDto generateFinanceReport(Long hospitalId) {
        String sql = """
        SELECT h.name, COALESCE(SUM(p.amount), 0), CURRENT_DATE
        FROM hospitals h
        LEFT JOIN payments p ON h.id = p.hospital_id
        WHERE h.id = :hospitalId
        GROUP BY h.name
        """;

        Query query = entityManager.createNativeQuery(sql);
        query.setParameter("hospitalId", hospitalId);

        @SuppressWarnings("unchecked")
        List<Object[]> results = query.getResultList();

        if (results.isEmpty()) {
            FinanceReportDto empty = new FinanceReportDto();
            empty.setHospitalName("Unknown");
            empty.setTotalRevenue(BigDecimal.ZERO);
            empty.setReportDate(LocalDate.now());
            return empty;
        }

        Object[] result = results.get(0);
        FinanceReportDto dto = new FinanceReportDto();
        dto.setHospitalName((String) result[0]);
        dto.setTotalRevenue((BigDecimal) result[1]);

        // ✅ Fix: Convert java.sql.Date to java.time.LocalDate
        Date sqlDate = (Date) result[2];
        LocalDate localDate = sqlDate.toLocalDate();
        dto.setReportDate(localDate);

        return dto;
    }
    @SuppressWarnings("SqlResolve")
    public List<PeakTimeReportDto> generatePeakTimeReport(Long hospitalId) {
        String sql = """
        SELECT h.name, HOUR(a.appointment_time), COUNT(*), CURRENT_DATE
        FROM hospitals h
        JOIN appointments a ON h.id = a.hospital_id
        WHERE h.id = :hospitalId
        GROUP BY h.name, HOUR(a.appointment_time)
        ORDER BY COUNT(*) DESC
        LIMIT 1
        """;

        Query query = entityManager.createNativeQuery(sql);
        query.setParameter("hospitalId", hospitalId);

        @SuppressWarnings("unchecked")
        List<Object[]> results = query.getResultList();

        if (results.isEmpty()) {
            return Collections.emptyList();
        }

        return results.stream().map(row -> {
            PeakTimeReportDto dto = new PeakTimeReportDto();
            dto.setHospitalName((String) row[0]);

            // Handle null hour (shouldn't happen due to JOIN, but safe)
            Number hourNum = (Number) row[1];
            int hour = (hourNum != null) ? hourNum.intValue() : 0;
            // Ensure hour is in valid range [0, 23]
            hour = Math.max(0, Math.min(23, hour));
            dto.setPeakHour(LocalTime.of(hour, 0));

            dto.setPatientCount(((Number) row[2]).intValue());

            // ✅ Fix: Convert java.sql.Date to java.time.LocalDate
            Date sqlDate = (Date) row[3];
            LocalDate localDate = sqlDate.toLocalDate();
            dto.setReportDate(localDate);

            return dto;
        }).collect(Collectors.toList());
    }}
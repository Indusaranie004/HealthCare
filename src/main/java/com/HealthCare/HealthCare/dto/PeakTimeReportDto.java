package com.HealthCare.HealthCare.dto;

import lombok.Data;
import java.time.LocalTime;
import java.time.LocalDate;

@Data
public class PeakTimeReportDto {
    private String hospitalName;
    private LocalTime peakHour;
    private Integer patientCount;
    private LocalDate reportDate;
}
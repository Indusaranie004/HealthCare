package com.HealthCare.HealthCare.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class FinanceReportDto {
    private String hospitalName;
    private BigDecimal totalRevenue;
    private LocalDate reportDate;
}
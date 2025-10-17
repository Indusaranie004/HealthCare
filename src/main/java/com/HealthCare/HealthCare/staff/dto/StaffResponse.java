package com.HealthCare.HealthCare.staff.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class StaffResponse {
    private Long staffId;
    private String name;
    private String email;
    private String specialty;
    private String dateRegistered;
}

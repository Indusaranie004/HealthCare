package com.HealthCare.HealthCare.staff.dto;

import lombok.Data;

@Data
public class StaffRequest {
    private String name;
    private String email;
    private String password;
    private String specialty;
}

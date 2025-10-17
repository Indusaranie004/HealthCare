package com.HealthCare.HealthCare.dto;

import com.HealthCare.HealthCare.entity.HospitalType;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.util.Set;

@Data
public class HospitalCreateRequest {
    @NotBlank(message = "Hospital name is required")
    private String name;

    @NotBlank(message = "Location is required")
    private String location;

    @NotNull(message = "Hospital type is required")
    private HospitalType type;

    @NotEmpty(message = "At least one service must be selected")
    private Set<Long> serviceIds;
}
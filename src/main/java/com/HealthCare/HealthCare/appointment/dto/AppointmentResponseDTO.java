package com.HealthCare.HealthCare.appointment.dto;

import com.HealthCare.HealthCare.appointment.model.AppointmentStatus;

import java.time.LocalDateTime;

public class AppointmentResponseDTO {
    private Long id;
    private String patientName;
    private String doctorName;
    private String hospitalName;
    private String serviceTypeName;
    private LocalDateTime dateTime;
    private String status;

    // Constructor
    public AppointmentResponseDTO(Long id, String patientName, String doctorName,
                                  String hospitalName, String serviceTypeName,
                                  LocalDateTime dateTime, String status) {
        this.id = id;
        this.patientName = patientName;
        this.doctorName = doctorName;
        this.hospitalName = hospitalName;
        this.serviceTypeName = serviceTypeName;
        this.dateTime = dateTime;
        this.status = status;
    }

    // Getters
    public Long getId() { return id; }
    public String getPatientName() { return patientName; }
    public String getDoctorName() { return doctorName; }
    public String getHospitalName() { return hospitalName; }
    public String getServiceTypeName() { return serviceTypeName; }
    public LocalDateTime getDateTime() { return dateTime; }
    public String getStatus() { return status; }




}

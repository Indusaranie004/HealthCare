package com.HealthCare.HealthCare.appointment.model;


import com.HealthCare.HealthCare.doctor.model.Doctor;
import com.HealthCare.HealthCare.hospital.model.Hospital;
import com.HealthCare.HealthCare.patient.model.Patient;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "appointment")


public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "patient_id")
    private com.HealthCare.HealthCare.patient.model.Patient patient;

    @ManyToOne
    @JoinColumn(name = "doctor_id")
    private com.HealthCare.HealthCare.doctor.model.Doctor doctor;

    @ManyToOne
    @JoinColumn(name = "hospital_id")
    private com.HealthCare.HealthCare.hospital.model.Hospital hospital;

    private java.time.LocalDateTime dateTime;

    @Enumerated(EnumType.STRING) // Stores as 'Booked', 'Cancelled', etc.
    @Column(nullable = false)
    private AppointmentStatus status = AppointmentStatus.Booked;

    // Constructors
    public Appointment() {}

    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public com.HealthCare.HealthCare.patient.model.Patient getPatient() { return patient; }
    public void setPatient(com.HealthCare.HealthCare.patient.model.Patient patient) { this.patient = patient; }

    public com.HealthCare.HealthCare.doctor.model.Doctor getDoctor() { return doctor; }
    public void setDoctor(com.HealthCare.HealthCare.doctor.model.Doctor doctor) { this.doctor = doctor; }

    public com.HealthCare.HealthCare.hospital.model.Hospital getHospital() { return hospital; }
    public void setHospital(com.HealthCare.HealthCare.hospital.model.Hospital hospital) { this.hospital = hospital; }

    public java.time.LocalDateTime getDateTime() { return dateTime; }
    public void setDateTime(java.time.LocalDateTime dateTime) { this.dateTime = dateTime; }

    public AppointmentStatus getStatus() { return status; }
    public void setStatus(AppointmentStatus status) { this.status = status; }






}

package com.HealthCare.HealthCare.appointment.service;


import com.HealthCare.HealthCare.appointment.dto.AppointmentRequestDTO;
import com.HealthCare.HealthCare.appointment.exception.AppointmentException;
import com.HealthCare.HealthCare.appointment.model.Appointment;
import com.HealthCare.HealthCare.appointment.model.AppointmentStatus;
import com.HealthCare.HealthCare.appointment.repository.*;
import com.HealthCare.HealthCare.doctor.model.Doctor;
import com.HealthCare.HealthCare.doctor.repository.DoctorRepository;
import com.HealthCare.HealthCare.hospital.model.Hospital;
import com.HealthCare.HealthCare.hospital.repository.HospitalRepository;
import com.HealthCare.HealthCare.patient.model.Patient;
import com.HealthCare.HealthCare.patient.repository.PatientRepository;
import com.HealthCare.HealthCare.serviceType.model.ServiceType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Collections;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;




public class AppointmentServiceTest {


    @Mock
    private PatientRepository patientRepo;
    @Mock
    private DoctorRepository doctorRepo;
    @Mock
    private HospitalRepository hospitalRepo;
    @Mock
    private AppointmentRepository appointmentRepo;

    @InjectMocks
    private AppointmentService service;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    // ✅ Test 1: Book appointment successfully
    @Test
    void bookAppointment_Success() {
        // Create full mock objects
        Patient patient = new Patient();
        patient.setId(1L);
        patient.setName("John Doe"); // ✅ Add name
        patient.setEmail("test@example.com");

        Hospital hospital = new Hospital();
        hospital.setId(1L);
        hospital.setName("City General Hospital");
        hospital.setAddress("Colombo");

        ServiceType serviceType = new ServiceType();
        serviceType.setId(1L);
        serviceType.setName("Consultation");

        Doctor doctor = new Doctor();
        doctor.setId(1L);
        doctor.setName("Dr. Anjalie Perera");
        doctor.setSpecialization("Cardiologist");
        doctor.setAvailableDays(Arrays.asList("MONDAY", "WEDNESDAY"));
        doctor.setHospital(hospital);      // ✅ Set hospital
        doctor.setServiceType(serviceType); // ✅ Set service type

        Appointment savedAppt = new Appointment();
        savedAppt.setPatient(patient); // ✅ Set patient
        savedAppt.setDoctor(doctor);   // ✅ Set doctor
        savedAppt.setHospital(hospital);
        savedAppt.setStatus(AppointmentStatus.Booked);

        when(patientRepo.findById(1L)).thenReturn(Optional.of(patient));
        when(doctorRepo.findById(1L)).thenReturn(Optional.of(doctor));
        when(hospitalRepo.findById(1L)).thenReturn(Optional.of(hospital));
        when(appointmentRepo.findByDoctorIdAndDateTime(eq(1L), any(LocalDateTime.class))).thenReturn(Collections.emptyList());
        when(appointmentRepo.findByPatientIdAndDateTime(eq(1L), any(LocalDateTime.class))).thenReturn(Collections.emptyList());
        when(appointmentRepo.save(any())).thenReturn(savedAppt);

        // Act
        AppointmentRequestDTO dto = new AppointmentRequestDTO();
        dto.setPatientId(1L); dto.setDoctorId(1L); dto.setHospitalId(1L);
        dto.setDateTime(LocalDateTime.of(2025, 9, 22, 10, 0)); // Monday

        var result = service.bookAppointment(dto);

        // Assert
        assertNotNull(result);
        assertEquals("Booked", result.getStatus());
    }

    // ✅ Test 2: Book fails – slot already booked
    @Test
    void bookAppointment_SlotAlreadyBooked() {
        when(patientRepo.findById(1L)).thenReturn(Optional.of(new Patient()));
        when(doctorRepo.findById(1L)).thenReturn(Optional.of(new Doctor()));
        when(hospitalRepo.findById(1L)).thenReturn(Optional.of(new Hospital()));
        when(appointmentRepo.findByDoctorIdAndDateTime(eq(1L), any(LocalDateTime.class)))
                .thenReturn(Collections.singletonList(new Appointment()));

        AppointmentRequestDTO dto = new AppointmentRequestDTO();
        dto.setPatientId(1L); dto.setDoctorId(1L); dto.setHospitalId(1L);
        dto.setDateTime(LocalDateTime.of(2025, 9, 22, 10, 0));

        assertThrows(AppointmentException.class, () -> service.bookAppointment(dto));
    }

    // ✅ Test 3: Cancel appointment successfully
    @Test
    void cancelAppointment_Success() {
        Appointment appt = new Appointment();
        appt.setStatus(AppointmentStatus.Booked);
        Patient patient = new Patient();
        patient.setEmail("test@example.com");
        appt.setPatient(patient);
        when(appointmentRepo.findById(1L)).thenReturn(Optional.of(appt));
        when(appointmentRepo.save(any())).thenAnswer(inv -> inv.getArgument(0));

        service.cancelAppointment(1L);

        assertEquals(AppointmentStatus.Cancelled, appt.getStatus());
    }

    // ✅ Test 4: Reschedule appointment successfully
    @Test
    void rescheduleAppointment_Success() {
        // Existing patient
        Patient patient = new Patient();
        patient.setId(1L);
        patient.setName("John Doe");
        patient.setEmail("test@example.com");

// Existing appointment
        Appointment appt = new Appointment();
        appt.setPatient(patient); // ✅ Set patient

// New hospital & service type
        Hospital newHospital = new Hospital();
        newHospital.setId(1L);
        newHospital.setName("City General Hospital");
        newHospital.setAddress("Colombo");

        ServiceType newServiceType = new ServiceType();
        newServiceType.setId(1L);
        newServiceType.setName("Consultation");

// New doctor
        Doctor newDoctor = new Doctor();
        newDoctor.setId(2L);
        newDoctor.setName("Dr. Rohan Silva");
        newDoctor.setSpecialization("General Physician");
        newDoctor.setAvailableDays(Arrays.asList("TUESDAY", "THURSDAY"));
        newDoctor.setHospital(newHospital);
        newDoctor.setServiceType(newServiceType); // ✅ Set service type

// Mock repo responses
        when(appointmentRepo.findById(1L)).thenReturn(Optional.of(appt));
        when(doctorRepo.findById(2L)).thenReturn(Optional.of(newDoctor));
// ... rest of mocks

        when(appointmentRepo.findById(1L)).thenReturn(Optional.of(appt));
        when(doctorRepo.findById(2L)).thenReturn(Optional.of(newDoctor));
        when(hospitalRepo.findById(1L)).thenReturn(Optional.of(newHospital));
        when(appointmentRepo.findByDoctorIdAndDateTime(eq(2L), any(LocalDateTime.class))).thenReturn(Collections.emptyList());
        when(appointmentRepo.findByPatientIdAndDateTime(eq(appt.getPatient().getId()), any(LocalDateTime.class))).thenReturn(Collections.emptyList());
        when(appointmentRepo.save(any())).thenAnswer(inv -> inv.getArgument(0));

        AppointmentRequestDTO dto = new AppointmentRequestDTO();
        dto.setDoctorId(2L); dto.setHospitalId(1L);
        dto.setDateTime(LocalDateTime.of(2025, 9, 23, 11, 0)); // Tuesday

        var result = service.rescheduleAppointment(1L, dto);

        assertNotNull(result);
        assertEquals("Rescheduled", result.getStatus());
    }








}

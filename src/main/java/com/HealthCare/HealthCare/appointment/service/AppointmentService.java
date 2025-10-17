package com.HealthCare.HealthCare.appointment.service;
import com.HealthCare.HealthCare.appointment.dto.AppointmentRequestDTO;
import com.HealthCare.HealthCare.appointment.dto.AppointmentResponseDTO;
import com.HealthCare.HealthCare.appointment.exception.AppointmentException;
import com.HealthCare.HealthCare.appointment.model.*;
import com.HealthCare.HealthCare.appointment.repository.*;
import com.HealthCare.HealthCare.doctor.model.Doctor;
import com.HealthCare.HealthCare.doctor.repository.DoctorRepository;
import com.HealthCare.HealthCare.hospital.model.Hospital;
import com.HealthCare.HealthCare.hospital.repository.HospitalRepository;
import com.HealthCare.HealthCare.patient.model.Patient;
import com.HealthCare.HealthCare.patient.repository.PatientRepository;
import com.HealthCare.HealthCare.serviceType.repository.ServiceTypeRepository;
import com.HealthCare.HealthCare.serviceType.model.ServiceType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;


@Service
public class AppointmentService {

    @Autowired private PatientRepository patientRepo;
    @Autowired private DoctorRepository doctorRepo;
    @Autowired private HospitalRepository hospitalRepo;
    @Autowired private ServiceTypeRepository serviceTypeRepo;
    @Autowired private AppointmentRepository appointmentRepo;

    // --- GETTERS FOR UI FLOW ---
    public List<Hospital> getAllHospitals() {
        return hospitalRepo.findAll();
    }

    public List<ServiceType> getServiceTypesByHospital(Long hospitalId) {
        return serviceTypeRepo.findAll(); // Simplified
    }

    public List<Doctor> getDoctorsByHospitalAndService(Long hospitalId, Long serviceTypeId) {
        return doctorRepo.findByHospitalIdAndServiceTypeId(hospitalId, serviceTypeId);
    }

    // --- BOOKING ---
    @Transactional
    public AppointmentResponseDTO bookAppointment(AppointmentRequestDTO dto) {
        validate(dto, true);

        Patient p = patientRepo.findById(dto.getPatientId()).orElseThrow(() -> new AppointmentException("Patient not found"));
        Doctor d = doctorRepo.findById(dto.getDoctorId()).orElseThrow(() -> new AppointmentException("Doctor not found"));
        Hospital h = hospitalRepo.findById(dto.getHospitalId()).orElseThrow(() -> new AppointmentException("Hospital not found"));

        if (!isSlotAvailable(d, dto.getDateTime()))
            throw new AppointmentException("Doctor is not available on this day");

        if (!appointmentRepo.findByDoctorIdAndDateTime(d.getId(), dto.getDateTime()).isEmpty())
            throw new AppointmentException("This time slot is already booked");

        if (!appointmentRepo.findByPatientIdAndDateTime(p.getId(), dto.getDateTime()).isEmpty())
            throw new AppointmentException("You already have an appointment at this time");

        Appointment appt = new Appointment();
        appt.setPatient(p); appt.setDoctor(d); appt.setHospital(h);
        appt.setDateTime(dto.getDateTime()); appt.setStatus(AppointmentStatus.Booked);
        Appointment saved = appointmentRepo.save(appt);

        sendNotification(p, "Your appointment is confirmed!");
        return toResponseDTO(saved);
    }

    // --- RESCHEDULE ---
    @Transactional
    public AppointmentResponseDTO rescheduleAppointment(Long id, AppointmentRequestDTO dto) {
        Appointment appt = appointmentRepo.findById(id).orElseThrow(() -> new AppointmentException("Appointment not found"));
        validate(dto, false);

        Doctor newDoctor = doctorRepo.findById(dto.getDoctorId()).orElseThrow(() -> new AppointmentException("New doctor not found"));
        Hospital newHospital = hospitalRepo.findById(dto.getHospitalId()).orElseThrow(() -> new AppointmentException("New hospital not found"));

        if (!isSlotAvailable(newDoctor, dto.getDateTime()))
            throw new AppointmentException("New slot not available");

        if (!appointmentRepo.findByDoctorIdAndDateTime(newDoctor.getId(), dto.getDateTime()).isEmpty())
            throw new AppointmentException("New time slot is already booked");

        if (!appointmentRepo.findByPatientIdAndDateTime(appt.getPatient().getId(), dto.getDateTime()).isEmpty())
            throw new AppointmentException("You already have an appointment at this time");

        appt.setDoctor(newDoctor);
        appt.setHospital(newHospital);
        appt.setDateTime(dto.getDateTime());
        appt.setStatus(AppointmentStatus.Rescheduled);
        Appointment saved = appointmentRepo.save(appt);

        sendNotification(appt.getPatient(), "Your appointment has been rescheduled!");
        return toResponseDTO(saved);
    }

    // --- CANCEL ---
    @Transactional
    public void cancelAppointment(Long id) {
        Appointment appt = appointmentRepo.findById(id).orElseThrow(() -> new AppointmentException("Appointment not found"));
        appt.setStatus(AppointmentStatus.Cancelled);
        appointmentRepo.save(appt);
        sendNotification(appt.getPatient(), "Your appointment has been cancelled.");
    }

    // --- GET APPOINTMENTS ---
    public List<AppointmentResponseDTO> getAppointmentsByPatient(Long patientId) {
        return appointmentRepo.findByPatientId(patientId).stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }

    // --- HELPERS ---
    private boolean isSlotAvailable(Doctor doctor, LocalDateTime dt) {
        return doctor.getAvailableDays().contains(dt.getDayOfWeek().toString());
    }

    private void validate(AppointmentRequestDTO dto, boolean isBooking) {
        if (dto.getPatientId() == null && isBooking) throw new AppointmentException("Patient ID required");
        if (dto.getDoctorId() == null) throw new AppointmentException("Doctor ID required");
        if (dto.getHospitalId() == null) throw new AppointmentException("Hospital ID required");
        if (dto.getDateTime() == null) throw new AppointmentException("Date/time required");
    }

    private void sendNotification(Patient patient, String message) {
        System.out.println("NOTIFICATION to " + patient.getEmail() + ": " + message);
    }

    private AppointmentResponseDTO toResponseDTO(Appointment a) {
        return new AppointmentResponseDTO(
                a.getId(),
                a.getPatient().getName(),
                a.getDoctor().getName(),
                a.getHospital().getName(),
                a.getDoctor().getServiceType().getName(),
                a.getDateTime(),
                a.getStatus().name()
        );
    }


}

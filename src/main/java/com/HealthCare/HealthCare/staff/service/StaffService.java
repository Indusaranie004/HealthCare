package com.HealthCare.HealthCare.staff.service;

import com.HealthCare.HealthCare.staff.dto.LoginRequest;
import com.HealthCare.HealthCare.staff.dto.StaffRequest;
import com.HealthCare.HealthCare.staff.dto.StaffResponse;
import com.HealthCare.HealthCare.staff.model.Staff;
import com.HealthCare.HealthCare.staff.repository.StaffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.time.format.DateTimeFormatter;

@Service
public class StaffService {

    @Autowired
    private StaffRepository staffRepository;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // Register staff
    public StaffResponse registerStaff(StaffRequest request) {
        if(staffRepository.findByEmail(request.getEmail()).isPresent()){
            throw new RuntimeException("Email already exists");
        }

        Staff staff = new Staff();
        staff.setName(request.getName());
        staff.setEmail(request.getEmail());
        staff.setPassword(passwordEncoder.encode(request.getPassword()));
        staff.setSpecialty(request.getSpecialty());

        Staff saved = staffRepository.save(staff);
        return mapToResponse(saved);
    }

    // Login staff
    public StaffResponse loginStaff(LoginRequest request) {
        Staff staff = staffRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if(!passwordEncoder.matches(request.getPassword(), staff.getPassword())){
            throw new RuntimeException("Invalid email or password");
        }

        return mapToResponse(staff);
    }

    private StaffResponse mapToResponse(Staff staff) {
        String date = staff.getDateRegistered().format(DateTimeFormatter.ISO_DATE);
        return new StaffResponse(staff.getStaffId(), staff.getName(), staff.getEmail(), staff.getSpecialty(), date);
    }
}

package com.HealthCare.HealthCare.staff.controller;

import com.HealthCare.HealthCare.staff.dto.LoginRequest;
import com.HealthCare.HealthCare.staff.dto.StaffRequest;
import com.HealthCare.HealthCare.staff.dto.StaffResponse;
import com.HealthCare.HealthCare.staff.service.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/staff")
public class StaffController {

    @Autowired
    private StaffService staffService;

    @PostMapping("/register")
    public ResponseEntity<StaffResponse> register(@RequestBody StaffRequest request){
        StaffResponse response = staffService.registerStaff(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<StaffResponse> login(@RequestBody LoginRequest request){
        StaffResponse response = staffService.loginStaff(request);
        return ResponseEntity.ok(response);
    }
}

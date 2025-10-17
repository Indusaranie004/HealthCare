package com.HealthCare.HealthCare.controller;

import com.HealthCare.HealthCare.entity.Account;
import com.HealthCare.HealthCare.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AccountRepository accountRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Account loginRequest) {
        Optional<Account> account = accountRepository.findByUserName(loginRequest.getUserName());

        if (account.isPresent() && account.get().getPassword().equals(loginRequest.getPassword())) {
            return ResponseEntity.ok().body(Map.of(
                    "success", true,
                    "message", "Login successful",
                    "patientId", account.get().getPatient().getPatientId()
            ));
        }
        return ResponseEntity.status(401).body(Map.of(
                "success", false,
                "message", "Invalid credentials"
        ));
    }
}
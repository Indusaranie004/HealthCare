package com.HealthCare.HealthCare.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

/**
 * Spring Security configuration for HealthCare backend.
 * <p>
 * Uses lambda-based configuration recommended in Spring Security 6.1+.
 * </p>
 */
@Configuration
public class SecurityConfig {

    /**
     * Configures HTTP security, including authorization rules and basic authentication.
     *
     * @param http HttpSecurity object
     * @return SecurityFilterChain
     * @throws Exception if configuration fails
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // disable CSRF for simplicity in development
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/staff/register", "/api/staff/login").permitAll()
                        .requestMatchers("/api/patients/**").permitAll() // allow public access to patient APIs
                        .requestMatchers("/api/medical-records/**").permitAll() //allow medical records
                        .anyRequest().authenticated() // any other request requires authentication
                )
                .httpBasic(Customizer.withDefaults()); // enable basic HTTP authentication

        return http.build();
    }

    /**
     * Password encoder bean using BCrypt hashing algorithm.
     *
     * @return PasswordEncoder instance
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}

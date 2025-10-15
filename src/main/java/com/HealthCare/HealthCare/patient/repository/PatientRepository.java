package com.HealthCare.HealthCare.patient.repository;

import com.HealthCare.HealthCare.patient.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository interface for managing Patient entities.
 * <p>
 * Extends JpaRepository to provide CRUD operations, pagination, and sorting.
 * Includes custom query methods for searching patients by common fields.
 * </p>
 */
@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {

    /**
     * Find patients whose first name contains the given string (case-insensitive).
     *
     * @param firstName partial or full first name
     * @return list of matching patients
     */
    List<Patient> findByFirstNameContainingIgnoreCase(String firstName);

    /**
     * Find patients whose last name contains the given string (case-insensitive).
     *
     * @param lastName partial or full last name
     * @return list of matching patients
     */
    List<Patient> findByLastNameContainingIgnoreCase(String lastName);

    /**
     * Find patients by status (e.g., Active, Inactive), case-insensitive.
     *
     * @param status status to search
     * @return list of matching patients
     */
    List<Patient> findByStatusContainingIgnoreCase(String status);

    /**
     * Find patients by department name (case-insensitive).
     *
     * @param department department name
     * @return list of matching patients
     */
    List<Patient> findByDepartmentContainingIgnoreCase(String department);
}

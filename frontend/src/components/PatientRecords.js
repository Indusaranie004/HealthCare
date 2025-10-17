import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";

const PatientRecords = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [error, setError] = useState("");

  // Fetch all patients
  useEffect(() => {
    fetchAllPatients();
  }, []);

  const fetchAllPatients = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/patients");
      if (response.ok) {
        const data = await response.json();
        setPatients(data);
      } else {
        setError("Failed to fetch patients");
      }
    } catch (err) {
      setError("Error: " + err.message);
    }
  };

  // Fetch patient by ID
  const fetchPatientById = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/patients/${id}`);
      if (response.ok) {
        const data = await response.json();
        setSelectedPatient(data);
      } else {
        setSelectedPatient(null);
        setError("Patient not found with ID: " + id);
      }
    } catch (err) {
      setError("Error: " + err.message);
    }
  };

  return (
    <div style={{ display: "flex", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", minHeight: "100vh", backgroundColor: "#f7f9fc" }}>
      <Sidebar />
      <div style={{ marginLeft: "220px", padding: "40px", width: "100%" }}>
        <h1 style={{ color: "#2c81f4", marginBottom: "20px" }}>Patient Records</h1>

        {error && <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>}

        {/* All Patients Table */}
        <div style={{ marginBottom: "40px", overflowX: "auto" }}>
          <h2>All Patients</h2>
          <table style={{ width: "100%", borderCollapse: "collapse", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
            <thead style={{ backgroundColor: "#2c81f4", color: "#fff" }}>
              <tr>
                <th style={{ padding: "12px 10px" }}>ID</th>
                <th style={{ padding: "12px 10px" }}>Name</th>
                <th style={{ padding: "12px 10px" }}>Department</th>
                <th style={{ padding: "12px 10px" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((p) => (
                <tr key={p.patientId} 
                    onClick={() => fetchPatientById(p.patientId)} 
                    style={{ cursor: "pointer", backgroundColor: "#fff", transition: "0.2s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f1f8ff")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#fff")}
                >
                  <td style={{ padding: "10px" }}>{p.patientId}</td>
                  <td style={{ padding: "10px" }}>{p.firstName} {p.lastName}</td>
                  <td style={{ padding: "10px" }}>{p.department}</td>
                  <td style={{ padding: "10px" }}>{p.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Selected Patient Details */}
        {selectedPatient && (
          <div style={{ padding: "25px", backgroundColor: "#fff", borderRadius: "12px", boxShadow: "0 4px 20px rgba(0,0,0,0.1)", maxWidth: "600px" }}>
            <h2 style={{ color: "#2c81f4" }}>{selectedPatient.firstName} {selectedPatient.lastName}</h2>
            <p><strong>ID:</strong> {selectedPatient.patientId}</p>
            <p><strong>DOB:</strong> {selectedPatient.dob}</p>
            <p><strong>Gender:</strong> {selectedPatient.gender}</p>
            <p><strong>Status:</strong> {selectedPatient.status}</p>
            <p><strong>Department:</strong> {selectedPatient.department}</p>
            <p><strong>Contact:</strong> {selectedPatient.contactNumber}</p>
            <p><strong>Insurance:</strong> {selectedPatient.insuranceProvider}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientRecords;

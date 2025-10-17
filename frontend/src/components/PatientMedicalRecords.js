import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

const PatientMedicalRecords = () => {
  const [patientId, setPatientId] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [records, setRecords] = useState([]);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({ chronicCondition: "", status: "", department: "" });
  const navigate = useNavigate();

  // Fetch patient by ID and medical records
  const handleSearch = async () => {
    if (!patientId) {
      setError("Please enter a Patient ID");
      setSelectedPatient(null);
      setRecords([]);
      return;
    }
    try {
      const patientResp = await fetch(`http://localhost:8080/api/patients/${patientId}`);
      if (!patientResp.ok) throw new Error("Patient not found");
      const patientData = await patientResp.json();
      setSelectedPatient(patientData);

      const recordsResp = await fetch(`http://localhost:8080/api/medical-records/patient/${patientId}`);
      if (!recordsResp.ok) throw new Error("No medical records found for this patient");
      let recordsData = await recordsResp.json();

      // Apply filters
      if (filters.chronicCondition)
        recordsData = recordsData.filter(r =>
          r.chronicCondition?.toLowerCase().includes(filters.chronicCondition.toLowerCase())
        );
      if (filters.status)
        recordsData = recordsData.filter(r =>
          selectedPatient.status?.toLowerCase().includes(filters.status.toLowerCase())
        );
      if (filters.department)
        recordsData = recordsData.filter(r =>
          selectedPatient.department?.toLowerCase().includes(filters.department.toLowerCase())
        );

      setRecords(recordsData);
      setError("");
    } catch (err) {
      setSelectedPatient(null);
      setRecords([]);
      setError(err.message);
    }
  };

  const handleDeleteRecord = async (recordId) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;
    try {
      const response = await fetch(`http://localhost:8080/api/medical-records/${recordId}`, { method: "DELETE" });
      if (response.ok) {
        setRecords(records.filter(r => r.recordId !== recordId));
        alert("Record deleted successfully!");
      } else {
        alert("Failed to delete record.");
      }
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  // Top Navbar styles
  const topNavbarStyle = {
    height: "60px",
    backgroundColor: "#2980b9",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 20px",
    color: "#fff",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  };

  const logoStyle = {
    fontWeight: "bold",
    fontSize: "20px",
  };

  const profileStyle = {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#2980b9",
    fontWeight: "bold",
    cursor: "pointer",
  };

  return (
    <div style={{ display: "flex", fontFamily: "'Poppins', sans-serif", minHeight: "100vh", background: "#e0f2fe" }}>
      <Sidebar />
      <main style={{ marginLeft: "220px", width: "100%", display: "flex", flexDirection: "column" }}>
        {/* Top Navbar */}
        <div style={topNavbarStyle}>
          <div style={logoStyle}>HealthCare</div>
          <div style={profileStyle}>D</div>
        </div>

        <div style={{ padding: "40px" }}>
          <h1 style={{ color: "#0c4a6e", fontWeight: "800", fontSize: "2.5rem", marginBottom: "30px" }}>Patient Medical Records</h1>

          {/* Search & Filters */}
          <div style={{ display: "flex", gap: "15px", marginBottom: "25px", flexWrap: "wrap" }}>
            <input
              type="text"
              placeholder="Enter Patient ID"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              style={{ padding: "14px 18px", borderRadius: "12px", border: "1px solid #60a5fa", fontSize: "1rem", outline: "none", flex: "1" }}
            />

            {/* Filters as dropdowns */}
            <select
              value={filters.chronicCondition}
              onChange={(e) => setFilters({ ...filters, chronicCondition: e.target.value })}
              style={{ padding: "14px 18px", borderRadius: "12px", border: "1px solid #60a5fa", flex: "1", fontSize: "1rem" }}
            >
              <option value="">All Chronic Conditions</option>
              <option value="Diabetes">Diabetes</option>
              <option value="Hypertension">Hypertension</option>
              <option value="Asthma">Asthma</option>
              <option value="Heart Disease">Heart Disease</option>
            </select>

            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              style={{ padding: "14px 18px", borderRadius: "12px", border: "1px solid #60a5fa", flex: "1", fontSize: "1rem" }}
            >
              <option value="">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Critical">Critical</option>
            </select>

            <select
              value={filters.department}
              onChange={(e) => setFilters({ ...filters, department: e.target.value })}
              style={{ padding: "14px 18px", borderRadius: "12px", border: "1px solid #60a5fa", flex: "1", fontSize: "1rem" }}
            >
              <option value="">All Departments</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Neurology">Neurology</option>
              <option value="Orthopedics">Orthopedics</option>
              <option value="Pediatrics">Pediatrics</option>
            </select>

            <button
              onClick={handleSearch}
              style={{
                padding: "14px 24px",
                background: "linear-gradient(90deg, #3b82f6, #06b6d4)",
                color: "#fff",
                border: "none",
                borderRadius: "12px",
                cursor: "pointer",
                fontWeight: "700",
                transition: "all 0.2s",
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
              onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
            >
              Search
            </button>
          </div>

          {error && <p style={{ color: "#b91c1c", fontWeight: "700", marginBottom: "20px" }}>{error}</p>}

          {/* Selected Patient */}
          {selectedPatient && (
            <section style={{ marginBottom: "40px", background: "linear-gradient(135deg,#93c5fd,#3b82f6)", color: "#fff", borderRadius: "16px", padding: "30px", boxShadow: "0 15px 35px rgba(0,0,0,0.15)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h2 style={{ fontWeight: "800" }}>{selectedPatient.firstName} {selectedPatient.lastName}</h2>
                <button
                  onClick={() => navigate(`/create-medical-record/${selectedPatient.patientId}`)}
                  style={{ padding: "12px 24px", backgroundColor: "#10b981", border: "none", borderRadius: "10px", fontWeight: "700", cursor: "pointer" }}
                >
                  + Update Record
                </button>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "12px", marginTop: "20px" }}>
                <p><strong>ID:</strong> {selectedPatient.patientId}</p>
                <p><strong>DOB:</strong> {selectedPatient.dob}</p>
                <p><strong>Gender:</strong> {selectedPatient.gender}</p>
                <p><strong>Status:</strong> {selectedPatient.status}</p>
                <p><strong>Department:</strong> {selectedPatient.department}</p>
                <p><strong>Contact:</strong> {selectedPatient.contactNumber}</p>
                <p><strong>Insurance:</strong> {selectedPatient.insuranceProvider}</p>
              </div>
            </section>
          )}

          {/* Medical Records */}
          <section>
            {records.map((rec) => (
              <div key={rec.recordId} style={{ background: "#fff", padding: "25px", borderRadius: "16px", boxShadow: "0 10px 30px rgba(0,0,0,0.1)", marginBottom: "25px", transition: "all 0.2s", cursor: "pointer" }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-5px)"} 
                onMouseLeave={e => e.currentTarget.style.transform = "translateY(0px)"}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <h3 style={{ color: "#1e3a8a", fontWeight: "700" }}>Record #{rec.recordId}</h3>
                  <div style={{ display: "flex", gap: "10px" }}>
                    {/* <button
                      style={{ padding: "8px 16px", backgroundColor: "#f59e0b", color: "#fff", border: "none", borderRadius: "10px", fontWeight: "600", cursor: "pointer" }}
                      onClick={() => navigate(`/update-medical-record/${rec.recordId}`)}
                    >
                      Update
                    </button> */}
                    <button
                      style={{ padding: "8px 16px", backgroundColor: "#dc2626", color: "#fff", border: "none", borderRadius: "10px", fontWeight: "600", cursor: "pointer" }}
                      onClick={() => handleDeleteRecord(rec.recordId)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div style={{ marginTop: "18px" }}>
                  <p><strong>Demographic:</strong> {rec.demographic}</p>
                  <p><strong>Alleges:</strong> {rec.alleges}</p>
                  <p><strong>Chronic Condition:</strong> {rec.chronicCondition}</p>
                  <p><strong>Past Surgeries:</strong> {rec.pastSurgeries}</p>

                  <h4 style={{ marginTop: "18px", color: "#2563eb" }}>Treatment Plans:</h4>
                  {rec.treatmentPlans.length === 0 && <p>No treatment plans</p>}
                  {rec.treatmentPlans.map((tp) => (
                    <div key={tp.treatmentId} style={{ marginBottom: "12px", padding: "14px", backgroundColor: "#dbeafe", borderRadius: "12px", boxShadow: "inset 0 0 8px rgba(0,0,0,0.05)" }}>
                      <p><strong>Current Medication:</strong> {tp.currentMedication}</p>
                      <p><strong>Future Appointments:</strong> {tp.futureAppointments}</p>
                      <p><strong>Notes:</strong> {tp.treatmentNote}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>
        </div>
      </main>
    </div>
  );
};

export default PatientMedicalRecords;

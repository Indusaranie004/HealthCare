import React, { useState } from "react";
import { QrReader } from "react-qr-reader";
import Sidebar from "./Sidebar";

const ScanHealthCard = () => {
  const [scanResult, setScanResult] = useState("");
  const [patient, setPatient] = useState(null);
  const [error, setError] = useState("");

  const handleScan = async (data) => {
    if (data && data !== scanResult) {
      setScanResult(data);
      setError("");
      try {
        const response = await fetch(`http://localhost:8080/api/patients/${data}`);
        if (response.ok) {
          const result = await response.json();
          setPatient(result);
        } else {
          setPatient(null);
          setError("Patient not found for ID: " + data);
        }
      } catch (err) {
        setError("Error fetching patient: " + err.message);
      }
    }
  };

  const handleError = (err) => {
    console.error(err);
    setError("Camera access error or not supported");
  };

  return (
    <div style={{ display: "flex", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", backgroundColor: "#f7f9fc", minHeight: "100vh" }}>
      <Sidebar />
      <div style={{ marginLeft: "220px", padding: "40px", width: "100%" }}>
        
        {/* Top Navbar */}
        <div
          style={{
            height: "60px",
            backgroundColor: "#2980b9",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 20px",
            color: "#fff",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            borderRadius: "8px",
            marginBottom: "30px",
          }}
        >
          <div style={{ fontWeight: "bold", fontSize: "20px" }}>HealthCare</div>
          <div
            style={{
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
            }}
          >
            D
          </div>
        </div>

        <h1 style={{ color: "#2c81f4", marginBottom: "20px", textAlign: "center" }}>Digital Health Care Card Scanner</h1>
        <p style={{ textAlign: "center" }}>Point the camera at a patient’s QR code to automatically load their record.</p>

        <div style={{ margin: "30px auto", width: "350px", backgroundColor: "#fff", padding: "20px", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
          <QrReader
            onResult={(result, error) => {
              if (!!result) handleScan(result?.text);
              if (!!error) handleError(error);
            }}
            constraints={{ facingMode: "environment" }}
            style={{ width: "100%" }}
          />
        </div>

        {scanResult && (
          <p style={{ fontWeight: "bold", color: "#2c81f4" }}>Scanned Patient ID: {scanResult}</p>
        )}

        {error && (
          <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>
        )}

        {patient && (
          <div
            style={{
              marginTop: "30px",
              padding: "20px",
              borderRadius: "12px",
              backgroundColor: "#fff",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              width: "fit-content",
            }}
          >
            <h2 style={{ color: "#2c81f4" }}>
              {patient.firstName} {patient.lastName}
            </h2>
            <p><strong>ID:</strong> {patient.patientId}</p>
            <p><strong>DOB:</strong> {patient.dob}</p>
            <p><strong>Gender:</strong> {patient.gender}</p>
            <p><strong>Status:</strong> {patient.status}</p>
            <p><strong>Department:</strong> {patient.department}</p>
            <p><strong>Contact:</strong> {patient.contactNumber}</p>
            <p><strong>Insurance:</strong> {patient.insuranceProvider}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScanHealthCard;

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateRecordForm = () => {
  const { recordId } = useParams();
  const navigate = useNavigate();
  const [record, setRecord] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/medical-records/${recordId}`);
        if (!res.ok) throw new Error("Record not found");
        const data = await res.json();
        setRecord(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchRecord();
  }, [recordId]);

  const handleChange = (e) => {
    setRecord({ ...record, [e.target.name]: e.target.value });
  };

  const updateTreatmentPlan = (index, field, value) => {
    const plans = record.treatmentPlans.map((plan, i) =>
      i === index ? { ...plan, [field]: value } : plan
    );
    setRecord({ ...record, treatmentPlans: plans });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/api/medical-records/${recordId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(record),
      });
      if (!response.ok) throw new Error("Failed to update record");
      setSuccess("Record updated successfully!");
      setError("");
      setTimeout(() => navigate(`/patient-medical-records`), 1500);
    } catch (err) {
      setError(err.message);
      setSuccess("");
    }
  };

  if (!record) return <p style={{ padding: "20px" }}>Loading record...</p>;

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "50px", backgroundColor: "#e0f2fe", minHeight: "100vh" }}>
      <form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          maxWidth: "800px",
          backgroundColor: "#fff",
          padding: "30px",
          borderRadius: "16px",
          boxShadow: "0 15px 35px rgba(0,0,0,0.15)",
        }}
      >
        <h2 style={{ fontSize: "2rem", fontWeight: "800", marginBottom: "25px", color: "#3b82f6" }}>Update Medical Record</h2>

        {error && <p style={{ color: "#dc2626", fontWeight: "600" }}>{error}</p>}
        {success && <p style={{ color: "#16a34a", fontWeight: "600" }}>{success}</p>}

        {/* Record Fields */}
        <input type="text" name="demographic" value={record.demographic} onChange={handleChange} placeholder="Demographic" style={{ padding: "12px", borderRadius: "10px", border: "1px solid #60a5fa", marginBottom: "10px", width: "100%" }} />
        <input type="text" name="alleges" value={record.alleges} onChange={handleChange} placeholder="Alleges" style={{ padding: "12px", borderRadius: "10px", border: "1px solid #60a5fa", marginBottom: "10px", width: "100%" }} />
        <input type="text" name="chronicCondition" value={record.chronicCondition} onChange={handleChange} placeholder="Chronic Condition" style={{ padding: "12px", borderRadius: "10px", border: "1px solid #60a5fa", marginBottom: "10px", width: "100%" }} />
        <input type="text" name="pastSurgeries" value={record.pastSurgeries} onChange={handleChange} placeholder="Past Surgeries" style={{ padding: "12px", borderRadius: "10px", border: "1px solid #60a5fa", marginBottom: "20px", width: "100%" }} />

        {/* Treatment Plans */}
        {record.treatmentPlans.map((plan, index) => (
          <div key={index} style={{ marginBottom: "15px", padding: "15px", backgroundColor: "#dbeafe", borderRadius: "10px" }}>
            <input type="text" value={plan.currentMedication} placeholder="Current Medication" onChange={(e) => updateTreatmentPlan(index, "currentMedication", e.target.value)} style={{ width: "100%", padding: "10px", marginBottom: "8px", borderRadius: "8px", border: "1px solid #60a5fa" }} />
            <input type="text" value={plan.futureAppointments} placeholder="Future Appointments" onChange={(e) => updateTreatmentPlan(index, "futureAppointments", e.target.value)} style={{ width: "100%", padding: "10px", marginBottom: "8px", borderRadius: "8px", border: "1px solid #60a5fa" }} />
            <textarea value={plan.treatmentNote} placeholder="Treatment Note" onChange={(e) => updateTreatmentPlan(index, "treatmentNote", e.target.value)} rows="3" style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #60a5fa" }} />
          </div>
        ))}

        {/* Buttons */}
        <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
          <button type="submit" style={{ flex: 1, padding: "14px", backgroundColor: "#10b981", color: "#fff", border: "none", borderRadius: "12px", fontWeight: "700", cursor: "pointer" }}>Update Record</button>
          <button type="button" onClick={() => navigate(`/patient-medical-records`)} style={{ flex: 1, padding: "14px", backgroundColor: "#f59e0b", color: "#fff", border: "none", borderRadius: "12px", fontWeight: "700", cursor: "pointer" }}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateRecordForm;

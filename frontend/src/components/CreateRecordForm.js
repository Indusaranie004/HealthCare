import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const CreateRecordForm = () => {
  const { patientId } = useParams(); // get patientId from URL
  const navigate = useNavigate();

  const [record, setRecord] = useState({
    demographic: "",
    alleges: "",
    chronicCondition: "",
    pastSurgeries: "",
    treatmentPlans: [{ currentMedication: "", futureAppointments: "", treatmentNote: "" }],
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Add new treatment plan
  const addTreatmentPlan = () => {
    setRecord({
      ...record,
      treatmentPlans: [...record.treatmentPlans, { currentMedication: "", futureAppointments: "", treatmentNote: "" }],
    });
  };

  // Remove a treatment plan
  const removeTreatmentPlan = (index) => {
    const plans = record.treatmentPlans.filter((_, i) => i !== index);
    setRecord({ ...record, treatmentPlans: plans });
  };

  // Update treatment plan fields
  const updateTreatmentPlan = (index, field, value) => {
    const plans = record.treatmentPlans.map((plan, i) => (i === index ? { ...plan, [field]: value } : plan));
    setRecord({ ...record, treatmentPlans: plans });
  };

  // Update scalar fields
  const handleChange = (e) => {
    setRecord({ ...record, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...record, patientId: parseInt(patientId) };
      const response = await fetch("http://localhost:8080/api/medical-records", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Failed to create medical record");
      setSuccess("Medical record created successfully!");
      setError("");
      setTimeout(() => navigate("/record-updated-success"), 1500); // redirect to main page
    } catch (err) {
      setError(err.message);
      setSuccess("");
    }
  };

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
        <h2
          style={{
            background: "linear-gradient(135deg,#3b82f6,#06b6d4)",
            WebkitBackgroundClip: "text",
            color: "transparent",
            fontSize: "2rem",
            fontWeight: "800",
            marginBottom: "25px",
          }}
        >
          Update Medical Record
        </h2>

        {error && <p style={{ color: "#dc2626", fontWeight: "600" }}>{error}</p>}
        {success && <p style={{ color: "#16a34a", fontWeight: "600" }}>{success}</p>}

        {/* Record Info */}
        <div style={{ display: "grid", gap: "15px", marginBottom: "25px" }}>
          <input
            type="text"
            name="demographic"
            placeholder="Demographic"
            value={record.demographic}
            onChange={handleChange}
            required
            style={{ padding: "12px 16px", borderRadius: "10px", border: "1px solid #60a5fa", outline: "none" }}
          />
          <input
            type="text"
            name="alleges"
            placeholder="Alleges"
            value={record.alleges}
            onChange={handleChange}
            style={{ padding: "12px 16px", borderRadius: "10px", border: "1px solid #60a5fa", outline: "none" }}
          />
          <input
            type="text"
            name="chronicCondition"
            placeholder="Chronic Condition"
            value={record.chronicCondition}
            onChange={handleChange}
            style={{ padding: "12px 16px", borderRadius: "10px", border: "1px solid #60a5fa", outline: "none" }}
          />
          <input
            type="text"
            name="pastSurgeries"
            placeholder="Past Surgeries"
            value={record.pastSurgeries}
            onChange={handleChange}
            style={{ padding: "12px 16px", borderRadius: "10px", border: "1px solid #60a5fa", outline: "none" }}
          />
        </div>

        {/* Treatment Plans */}
        <div style={{ marginBottom: "25px" }}>
          <h3 style={{ fontWeight: "700", marginBottom: "15px", color: "#1e40af" }}>Treatment Plans</h3>
          {record.treatmentPlans.map((plan, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "#dbeafe",
                padding: "20px",
                borderRadius: "14px",
                marginBottom: "15px",
                position: "relative",
              }}
            >
              <button
                type="button"
                onClick={() => removeTreatmentPlan(index)}
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  backgroundColor: "#ef4444",
                  color: "#fff",
                  border: "none",
                  borderRadius: "50%",
                  width: "28px",
                  height: "28px",
                  cursor: "pointer",
                  fontWeight: "700",
                }}
              >
                &times;
              </button>
              <input
                type="text"
                placeholder="Current Medication"
                value={plan.currentMedication}
                onChange={(e) => updateTreatmentPlan(index, "currentMedication", e.target.value)}
                style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #60a5fa", marginBottom: "10px", outline: "none" }}
              />
              <input
                type="text"
                placeholder="Future Appointments"
                value={plan.futureAppointments}
                onChange={(e) => updateTreatmentPlan(index, "futureAppointments", e.target.value)}
                style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #60a5fa", marginBottom: "10px", outline: "none" }}
              />
              <textarea
                placeholder="Treatment Note"
                value={plan.treatmentNote}
                onChange={(e) => updateTreatmentPlan(index, "treatmentNote", e.target.value)}
                rows="3"
                style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #60a5fa", outline: "none" }}
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addTreatmentPlan}
            style={{ padding: "10px 20px", backgroundColor: "#3b82f6", color: "#fff", border: "none", borderRadius: "10px", cursor: "pointer", fontWeight: "700" }}
          >
            + Add Treatment Plan
          </button>
        </div>

        {/* Submit & Cancel Buttons */}
        <div style={{ display: "flex", gap: "15px", marginTop: "20px" }}>
          <button
            type="submit"
            style={{
              padding: "14px 24px",
              backgroundColor: "#10b981",
              color: "#fff",
              border: "none",
              borderRadius: "12px",
              fontWeight: "700",
              cursor: "pointer",
              flex: 1,
              fontSize: "1.1rem",
            }}
          >
            Save Change
          </button>

          <button
            type="button"
            onClick={() => navigate(-1)}
            style={{
              padding: "14px 24px",
              backgroundColor: "#ef4444",
              color: "#fff",
              border: "none",
              borderRadius: "12px",
              fontWeight: "700",
              cursor: "pointer",
              flex: 1,
              fontSize: "1.1rem",
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateRecordForm;

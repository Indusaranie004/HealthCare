import React from "react";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import { FaUsers, FaFileMedicalAlt, FaProcedures } from "react-icons/fa";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Analyze = () => {
  const navigate = useNavigate();

  const pageStyle = {
    display: "flex",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#f0f4f8",
  };

  const contentStyle = {
    flex: 1,
    marginLeft: "220px",
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  };

  const topNavbarStyle = {
    height: "70px",
    background: "linear-gradient(90deg, #3b82f6, #06b6d4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 25px",
    color: "#fff",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    fontSize: "1.1rem",
    fontWeight: "600",
  };

  const logoStyle = { fontWeight: "bold", fontSize: "1.4rem", letterSpacing: "1px" };

  const profileStyle = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    cursor: "pointer",
    fontWeight: "600",
    color: "#fff",
  };

  const profileIconStyle = {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#3b82f6",
    fontWeight: "bold",
    fontSize: "1.2rem",
  };

  const cardsContainer = {
    display: "flex",
    gap: "20px",
    padding: "20px",
    flexWrap: "wrap",
  };

  const cardStyle = {
    flex: "1 1 250px",
    backgroundColor: "#fff",
    borderRadius: "14px",
    padding: "25px 20px",
    display: "flex",
    alignItems: "center",
    gap: "15px",
    boxShadow: "0 6px 15px rgba(0,0,0,0.08)",
    cursor: "pointer",
    transition: "all 0.3s ease",
  };

  const cardHover = (e) => {
    e.currentTarget.style.transform = "translateY(-5px)";
    e.currentTarget.style.boxShadow = "0 12px 25px rgba(0,0,0,0.15)";
  };

  const cardUnhover = (e) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = "0 6px 15px rgba(0,0,0,0.08)";
  };

  const analyticsCards = [
    { title: "Total Patients", value: 120, icon: <FaUsers size={35} color="#3b82f6" /> },
    { title: "Medical Records", value: 230, icon: <FaFileMedicalAlt size={35} color="#10b981" /> },
    { title: "Treatments Today", value: 28, icon: <FaProcedures size={35} color="#f59e0b" /> },
  ];

  // Example Line Chart Data
  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "New Patients",
        data: [12, 19, 14, 25, 22, 30, 28],
        fill: true,
        backgroundColor: "rgba(59,130,246,0.2)",
        borderColor: "#3b82f6",
        tension: 0.4,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    plugins: { legend: { position: "top" } },
  };

  // Example Bar Chart Data
  const barData = {
    labels: ["Cardiology", "Neurology", "Orthopedics", "Pediatrics", "Oncology"],
    datasets: [
      {
        label: "Patients per Department",
        data: [45, 30, 25, 40, 20],
        backgroundColor: ["#3b82f6", "#06b6d4", "#10b981", "#f59e0b", "#ef4444"],
      },
    ],
  };

  const barOptions = { responsive: true, plugins: { legend: { display: false } } };

  return (
    <div style={pageStyle}>
      <Sidebar />
      <div style={contentStyle}>
        {/* Top Navbar */}
        <div style={topNavbarStyle}>
          <div style={logoStyle}>HealthCare Analytics</div>
          <div style={profileStyle}>
            <div style={profileIconStyle}>P</div>
            Prasanna
          </div>
        </div>

        {/* Cards */}
        <div style={cardsContainer}>
          {analyticsCards.map((card, index) => (
            <div
              key={index}
              style={cardStyle}
              onMouseOver={cardHover}
              onMouseOut={cardUnhover}
            >
              {card.icon}
              <div>
                <h3 style={{ margin: 0, fontSize: "1.2rem", color: "#1e40af" }}>{card.value}</h3>
                <p style={{ margin: 0, fontSize: "0.9rem", color: "#6b7280" }}>{card.title}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div style={{ display: "flex", gap: "25px", flexWrap: "wrap", padding: "0 20px" }}>
          <div style={{ flex: "1 1 500px", background: "#fff", padding: "20px", borderRadius: "14px", boxShadow: "0 6px 15px rgba(0,0,0,0.08)" }}>
            <h3 style={{ color: "#1e40af", marginBottom: "15px" }}>New Patients Trend</h3>
            <Line data={lineData} options={lineOptions} />
          </div>
          <div style={{ flex: "1 1 500px", background: "#fff", padding: "20px", borderRadius: "14px", boxShadow: "0 6px 15px rgba(0,0,0,0.08)" }}>
            <h3 style={{ color: "#1e40af", marginBottom: "15px" }}>Patients by Department</h3>
            <Bar data={barData} options={barOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analyze;

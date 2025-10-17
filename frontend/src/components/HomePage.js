import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { FaFileMedicalAlt, FaSearch, FaIdCard, FaCogs, FaChartLine, FaFileAlt, FaBell } from "react-icons/fa";

const HomePage = () => {
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
    height: "80px",
    background: "linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 30px",
    color: "#fff",
    boxShadow: "0 5px 20px rgba(0,0,0,0.15)",
    fontSize: "1.1rem",
    fontWeight: "600",
    borderBottomLeftRadius: "15px",
    borderBottomRightRadius: "15px",
  };

  const logoStyle = {
    fontWeight: "bold",
    fontSize: "1.6rem",
    letterSpacing: "1px",
    cursor: "pointer",
  };

  const profileStyle = {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    cursor: "pointer",
  };

  const profileIconStyle = {
    width: "45px",
    height: "45px",
    borderRadius: "50%",
    backgroundColor: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#3b82f6",
    fontWeight: "bold",
    fontSize: "1.2rem",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  };

  const notificationStyle = {
    width: "45px",
    height: "45px",
    borderRadius: "50%",
    backgroundColor: "rgba(255,255,255,0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontSize: "1.2rem",
    cursor: "pointer",
    transition: "all 0.3s ease",
  };

  const notificationHover = (e) => {
    e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.35)";
  };
  const notificationUnhover = (e) => {
    e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.2)";
  };

  const welcomeContainer = {
    padding: "25px 30px",
    backgroundColor: "#fff",
    margin: "20px",
    borderRadius: "14px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
  };

  const welcomeTitle = {
    fontSize: "1.8rem",
    fontWeight: "700",
    color: "#1e40af",
    marginBottom: "10px",
  };

  const welcomeSubtitle = {
    fontSize: "1rem",
    color: "#374151",
  };

  const cardsContainer = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "25px",
    padding: "20px 25px",
  };

  const cardStyle = {
    backgroundColor: "#fff",
    color: "#1e40af",
    borderRadius: "14px",
    padding: "30px 20px",
    textAlign: "center",
    fontWeight: "700",
    fontSize: "1.1rem",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 6px 15px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "15px",
  };

  const cardHover = (e) => {
    e.currentTarget.style.transform = "translateY(-8px)";
    e.currentTarget.style.boxShadow = "0 15px 25px rgba(0,0,0,0.15)";
    e.currentTarget.style.color = "#fff";
    e.currentTarget.style.background = "linear-gradient(135deg, #3b82f6, #06b6d4)";
  };

  const cardUnhover = (e) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = "0 6px 15px rgba(0,0,0,0.08)";
    e.currentTarget.style.color = "#1e40af";
    e.currentTarget.style.background = "#fff";
  };

  const cards = [
    { title: "Manage Patient Records", path: "/patient-medical-records", icon: <FaFileMedicalAlt size={40} /> },
    { title: "Scan Health Card", path: "/scan-health-card", icon: <FaIdCard size={40} /> },
    { title: "Patient Search", path: "/search-patients", icon: <FaSearch size={40} /> },
    { title: "System Settings", path: "/settings", icon: <FaCogs size={40} /> },
    { title: "Performance Analytics", path: "/analyze", icon: <FaChartLine size={40} /> },
    { title: "Generate Reports", path: "/reports", icon: <FaFileAlt size={40} /> },
  ];

  return (
    <div style={pageStyle}>
      <Sidebar />
      <div style={contentStyle}>
        {/* Top Navbar */}
        <div style={topNavbarStyle}>
          <div style={logoStyle}>HealthCare</div>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div
              style={notificationStyle}
              onMouseOver={notificationHover}
              onMouseOut={notificationUnhover}
            >
              <FaBell />
            </div>
            <div style={profileStyle}>
              <div style={profileIconStyle}>P</div>
              Prasanna
            </div>
          </div>
        </div>

        {/* Welcome Section */}
        <div style={welcomeContainer}>
          <h1 style={welcomeTitle}>Welcome Back, Prasanna!</h1>
          <p style={welcomeSubtitle}>
            Dashboard Overview - Your central hub for Ducta Healthcare System.
          </p>
        </div>

        {/* Cards Section */}
        <div style={cardsContainer}>
          {cards.map((card, index) => (
            <div
              key={index}
              style={cardStyle}
              onClick={() => navigate(card.path)}
              onMouseOver={cardHover}
              onMouseOut={cardUnhover}
            >
              {card.icon}
              {card.title}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;

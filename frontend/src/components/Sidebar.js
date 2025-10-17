import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  FaTachometerAlt, 
  FaSearch, 
  FaIdCard, 
  FaNotesMedical, 
  FaCog, 
  FaSignOutAlt 
} from "react-icons/fa";

const Sidebar = () => {
  const navigate = useNavigate();

  const sidebarStyle = {
    height: "100vh",
    width: "220px",
    position: "fixed",
    top: 0,
    left: 0,
    backgroundColor: "#3498db",
    padding: "20px",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    boxShadow: "2px 0 10px rgba(0,0,0,0.1)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: "#fff",
  };

  const linksContainerStyle = {
    display: "flex",
    flexDirection: "column",
  };

  const linkStyle = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    margin: "15px 0",
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold",
    padding: "8px 12px",
    borderRadius: "6px",
    transition: "all 0.2s ease",
  };

  const logoutStyle = {
    marginTop: "20px",
    padding: "10px",
    backgroundColor: "#e74c3c",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "all 0.2s ease",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/"); // redirect to login
  };

  return (
    <div style={sidebarStyle}>
      <div style={linksContainerStyle}>
        <Link
          to="/home"
          style={linkStyle}
          onMouseOver={(e) => (e.target.style.backgroundColor = "rgba(255,255,255,0.2)")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "transparent")}
        >
          <FaTachometerAlt /> Dashboard
        </Link>
        <Link
          to="/search-patients"
          style={linkStyle}
          onMouseOver={(e) => (e.target.style.backgroundColor = "rgba(255,255,255,0.2)")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "transparent")}
        >
          <FaSearch /> Patient Search
        </Link>
        <Link
          to="/scan-health-card"
          style={linkStyle}
          onMouseOver={(e) => (e.target.style.backgroundColor = "rgba(255,255,255,0.2)")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "transparent")}
        >
          <FaIdCard /> Health Card Scan
        </Link>
        <Link
          to="/patient-medical-records"
          style={linkStyle}
          onMouseOver={(e) => (e.target.style.backgroundColor = "rgba(255,255,255,0.2)")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "transparent")}
        >
          <FaNotesMedical /> View Records
        </Link>
        <Link
          to="/settings"
          style={linkStyle}
          onMouseOver={(e) => (e.target.style.backgroundColor = "rgba(255,255,255,0.2)")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "transparent")}
        >
          <FaCog /> Settings
        </Link>
      </div>
      <button
        style={logoutStyle}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#c0392b")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#e74c3c")}
        onClick={handleLogout}
      >
        <FaSignOutAlt /> Logout
      </button>
    </div>
  );
};

export default Sidebar;

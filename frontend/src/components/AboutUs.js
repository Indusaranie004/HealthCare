import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
  const navigate = useNavigate();
  return (
    <div style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      {/* Header */}
      <header style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1000,
        padding: "15px 50px",
        display: "flex",
        justifyContent: "left",
        alignItems: "center",
        backgroundColor: "rgba(37, 99, 235, 0.95)", // light blue background
        backdropFilter: "blur(15px)",
        color: "#fff",
        fontWeight: "bold",
        fontSize: "1.5rem",
      }}>
        HealthCare System
        
      </header>

      {/* Hero Section */}
      <section style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "60vh",
        marginTop: "70px",
        backgroundImage: "url('/about-bg.jpg')", // add your image in public folder
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "#fff",
        textAlign: "center",
        position: "relative",
      }}>
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,255,0.5)" // overlay
        }} />
        <div style={{ position: "relative", zIndex: 10 }}>
          <h1 style={{ fontSize: "3rem", fontWeight: "900", marginBottom: "15px" }}>
            About Us
          </h1>
          <p style={{ fontSize: "1.2rem", maxWidth: "600px", margin: "0 auto" }}>
            Learn more about our mission, vision, and how we are improving healthcare management for everyone.
          </p>
        <br />
        <button
      onClick={() => navigate("/")}
      style={{
        padding: "12px 30px",
        fontSize: "1rem",
        fontWeight: "600",
        borderRadius: "10px",
        border: "none",
        cursor: "pointer",
        background: "linear-gradient( rgba(255,255,255,0.3)",
        color: "#fff",
        boxShadow: "0 6px 20px rgba(30,58,138,0.4)",
        transition: "all 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.target.style.transform = "translateY(-3px)";
        e.target.style.boxShadow = "0 10px 30px rgba(30,58,138,0.6)";
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = "translateY(0)";
        e.target.style.boxShadow = "0 6px 20px rgba(30,58,138,0.4)";
      }}
    >
      Home
    </button>

        </div>
      </section>

      {/* About Content */}
      <section style={{
        padding: "80px 20px",
        backgroundColor: "#f0f4ff",
        textAlign: "center",
      }}>
        <h2 style={{ fontSize: "2.5rem", fontWeight: "800", color: "#0000cc", marginBottom: "40px" }}>
          Our Mission & Vision
        </h2>
        <p style={{ maxWidth: "800px", margin: "0 auto", fontSize: "1.1rem", color: "#333" }}>
          Our mission is to create a secure, efficient, and user-friendly healthcare management system
          that helps hospitals, doctors, and patients manage medical records effectively.
          <br /><br />
          Our vision is to make healthcare accessible, organized, and modern using cutting-edge technology.
        </p>
      </section>

      {/* Team Section */}
      <section style={{ padding: "80px 20px", backgroundColor: "#fff", textAlign: "center" }}>
        <h2 style={{ fontSize: "2.5rem", fontWeight: "800", color: "#0000cc", marginBottom: "50px" }}>
          Meet Our Team
        </h2>
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "40px",
        }}>
          {[
            { name: "Dr. Saman", role: "Founder & CEO", img: "/team1.jpg" },
            { name: "Nadeesha", role: "CTO", img: "/team2.jpg" },
            { name: "Dilshan", role: "Head of Operations", img: "/team3.jpg" },
          ].map((member, i) => (
            <div key={i} style={{
              width: "250px",
              backgroundColor: "#f0f4ff",
              borderRadius: "20px",
              padding: "20px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
            }}>
              <img src={member.img} alt={member.name} style={{
                width: "100%",
                height: "250px",
                objectFit: "cover",
                borderRadius: "15px",
                marginBottom: "15px",
              }} />
              <h3 style={{ fontSize: "1.5rem", fontWeight: "700", color: "#0000cc" }}>{member.name}</h3>
              <p style={{ color: "#333", fontWeight: "500" }}>{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        backgroundColor: "#2563eb",
        color: "#fff",
        padding: "50px 20px",
        textAlign: "center",
      }}>
        <p>&copy; 2025 HealthCare System. All Rights Reserved.</p>
        <div style={{ display: "flex", justifyContent: "center", gap: "20px", fontSize: "1.2rem", marginTop: "15px" }}>
          <FaFacebookF style={{ cursor: "pointer" }} />
          <FaTwitter style={{ cursor: "pointer" }} />
          <FaLinkedinIn style={{ cursor: "pointer" }} />
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;

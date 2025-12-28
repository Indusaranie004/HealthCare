import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const HomePageNew = () => {
  const navigate = useNavigate();

  // Hero images
  const images = ["/homeimg.jpg", "/homeimg2.jpg", "/homeimg3.jpg"];
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000); // change image every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      
      {/* Header */}
      <header style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        padding: "1.5rem 3rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "rgba(37, 99, 235, 0.95)",
        backdropFilter: "blur(10px)",
        zIndex: 50,
        color: "#fff"
      }}>
        <div style={{ fontWeight: "bold", fontSize: "1.8rem" }}>HealthCare System</div>
        <nav style={{ display: "flex", gap: "2rem" }}>
          <span style={navLinkStyle} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Home</span>
          <span style={navLinkStyle} onClick={() => window.scrollTo({ top: 700, behavior: "smooth" })}>Features</span>
          <span style={navLinkStyle} onClick={() => navigate("/login")}>Login</span>
          <span style={navLinkStyle} onClick={() => navigate("/about-us")}>About Us</span>
          <span style={navLinkStyle} onClick={() => navigate("/login")}>Login</span>
        </nav>
      </header>

      {/* Hero Section */}
      <section style={{
        position: "relative",
        height: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        overflow: "hidden",
        paddingTop: "4rem"
      }}>
        {/* Background Image */}
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${images[currentImage]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transition: "all 1s ease-in-out",
          filter: "brightness(0.4)"
        }} />

        {/* Overlay Gradient */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, rgba(37, 99, 235, 0.5), rgba(59, 130, 246, 0.5))"
        }} />

        {/* Floating Shapes */}
        <div style={floatingShapeStyle}></div>
        <div style={{ ...floatingShapeStyle, bottom: "10%", right: "10%", width: "14rem", height: "14rem", animationDelay: "0.5s" }} />
        <div style={{ ...floatingShapeStyle, top: "30%", right: "25%", width: "6rem", height: "6rem", animationDelay: "0.7s" }} />

        {/* Hero Content */}
        <div style={{ position: "relative", zIndex: 10, color: "#fff", maxWidth: "700px" }}>
          <h1 style={{ fontSize: "4rem", fontWeight: "900", textShadow: "0 4px 15px rgba(0,0,0,0.4)", marginBottom: "1rem" }}>
            Welcome to <span style={{ color: "#60a5fa" }}>HealthCare System</span>
          </h1>
          <p style={{ fontSize: "1.5rem", color: "#dbeafe", marginBottom: "2rem" }}>
            Manage patient records, streamline workflows, and improve healthcare efficiency — securely and effortlessly.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
            <button style={primaryBtnStyle} onClick={() => navigate("/login")}>Login</button>
            <button style={secondaryBtnStyle} onClick={() => navigate("/about-us")}>Learn More</button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: "5rem 2rem", backgroundColor: "#eff6ff", textAlign: "center" }}>
        <h2 style={{ fontSize: "3rem", fontWeight: "800", color: "#2563eb", marginBottom: "3rem" }}>Features</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }}>
          {[
            { title: "Patient Records", desc: "Securely manage and access detailed patient medical records in real-time.", icon: "🩺" },
            { title: "Appointments", desc: "Schedule and track patient appointments seamlessly within the system.", icon: "📅" },
            { title: "Analytics", desc: "Monitor health trends, patient metrics, and generate insightful reports.", icon: "📊" },
          ].map((card, i) => (
            <div key={i} style={featureCardStyle}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>{card.icon}</div>
              <h3 style={{ color: "#2563eb", fontSize: "1.5rem", fontWeight: "700", marginBottom: "1rem" }}>{card.title}</h3>
              <p>{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      {/* <section style={{ padding: "5rem 2rem", backgroundColor: "white", textAlign: "center" }}>
        <h2 style={{ fontSize: "3rem", fontWeight: "800", color: "#2563eb", marginBottom: "3rem" }}>What People Say</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }}>
          {[
            { text: "HealthCare System improved our workflow efficiency drastically.", user: "Dr. Saman" },
            { text: "Patient records are now easy to manage securely.", user: "Nurse Dilani" },
            { text: "Appointments and follow-ups are smooth and organized.", user: "Admin Nadeesha" },
          ].map((t, i) => (
            <div key={i} style={testimonialCardStyle}>
              <p style={{ fontStyle: "italic", marginBottom: "0.5rem" }}>“{t.text}”</p>
              <h4 style={{ color: "#2563eb", fontWeight: "600" }}>{t.user}</h4>
            </div>
          ))}
        </div>
      </section> */}

      {/* Footer */}
      <footer style={{ backgroundColor: "#2563eb", color: "white", padding: "3rem 1.5rem", textAlign: "center" }}>
        <p style={{ marginBottom: "1rem" }}>&copy; 2025 HealthCare System. All Rights Reserved.</p>
        <div style={{ display: "flex", justifyContent: "center", gap: "1.5rem", fontSize: "1.5rem" }}>
          <FaFacebookF style={{ cursor: "pointer" }} />
          <FaTwitter style={{ cursor: "pointer" }} />
          <FaLinkedinIn style={{ cursor: "pointer" }} />
        </div>
      </footer>

      {/* Animations */}
      <style>
        {`
          @keyframes bgMove {
            0% { background-position: 0% 0%; }
            100% { background-position: 100% 100%; }
          }
          @keyframes pulse {
            0%,100% { transform: scale(1); opacity: 0.1; }
            50% { transform: scale(1.2); opacity: 0.2; }
          }
        `}
      </style>
    </div>
  );
};

// ---------- Inline Styles ----------
const navLinkStyle = { color: "white", fontWeight: 600, cursor: "pointer", transition: "all 0.3s ease" };
const floatingShapeStyle = { position: "absolute", borderRadius: "50%", filter: "blur(3rem)", opacity: 0.1, animation: "pulse 6s ease-in-out infinite" };
const primaryBtnStyle = { padding: "1rem 2.5rem", borderRadius: "12px", fontWeight: 700, border: "none", cursor: "pointer", backgroundColor: "#2563eb", color: "white", transition: "all 0.3s ease" };
const secondaryBtnStyle = { padding: "1rem 2.5rem", borderRadius: "12px", fontWeight: 700, border: "none", cursor: "pointer", backgroundColor: "rgba(255,255,255,0.2)", color: "white", backdropFilter: "blur(10px)", borderColor: "rgba(255,255,255,0.3)", transition: "all 0.3s ease" };
const featureCardStyle = { backgroundColor: "white", padding: "2rem", borderRadius: "1rem", boxShadow: "0 10px 25px rgba(0,0,0,0.1)", transition: "all 0.3s ease", textAlign: "center" };
const testimonialCardStyle = { backgroundColor: "#e0f2fe", padding: "2rem", borderRadius: "1rem", boxShadow: "0 6px 15px rgba(0,0,0,0.1)", transition: "all 0.3s ease" };

export default HomePageNew;

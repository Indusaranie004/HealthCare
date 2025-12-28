import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const StaffLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:8080/api/staff/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Login failed");
      }

      const data = await response.json();
      if (data.token) localStorage.setItem("authToken", data.token);

      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        fontFamily: "'Poppins', sans-serif",
        backgroundImage: "url('/login-bg.jpg')", // Add your background image in public folder
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Overlay for better readability */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 0, 80, 0.5)",
          zIndex: 1,
        }}
      />

      <form
        onSubmit={handleLogin}
        style={{
          position: "relative",
          zIndex: 2,
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          padding: "50px 40px",
          borderRadius: "20px",
          boxShadow: "0 25px 60px rgba(0,0,0,0.3)",
          width: "100%",
          maxWidth: "420px",
          display: "flex",
          flexDirection: "column",
          gap: "25px",
          transition: "all 0.3s ease",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "2.5rem",
            fontWeight: "900",
            background: "linear-gradient(90deg,#1e3a8a,#3b82f6)",
            WebkitBackgroundClip: "text",
            color: "transparent",
            marginBottom: "10px",
          }}
        >
          Sign In 👤
        </h2>

        <p
          style={{
            textAlign: "center",
            color: "#21354bff",
            fontSize: "1rem",
            marginBottom: "20px",
          }}
        >
          Access your staff account securely
        </p>

        {error && (
          <p
            style={{
              color: "#b91c1c",
              textAlign: "center",
              fontWeight: "600",
              backgroundColor: "#fee2e2",
              padding: "10px",
              borderRadius: "8px",
            }}
          >
            {error}
          </p>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <input
            type="email"
            placeholder="✉️ Email "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              padding: "15px 18px",
              borderRadius: "12px",
              border: "1px solid #93c5fd",
              outline: "none",
              fontSize: "1rem",
              transition: "all 0.3s ease",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
            onBlur={(e) => (e.target.style.borderColor = "#93c5fd")}
          />

          <input
            type="password"
            placeholder="🗝️ Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              padding: "15px 18px",
              borderRadius: "12px",
              border: "1px solid #93c5fd",
              outline: "none",
              fontSize: "1rem",
              transition: "all 0.3s ease",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
            onBlur={(e) => (e.target.style.borderColor = "#93c5fd")}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: "16px",
            borderRadius: "12px",
            fontWeight: "700",
            fontSize: "1.1rem",
            cursor: "pointer",
            background: "linear-gradient(90deg,#3b82f6,#1e40af)",
            color: "#fff",
            border: "none",
            transition: "all 0.3s ease",
            boxShadow: "0 10px 25px rgba(30,58,138,0.4)",
          }}
          onMouseEnter={(e) => {
            e.target.style.boxShadow = "0 14px 35px rgba(30,58,138,0.6)";
            e.target.style.transform = "translateY(-3px)";
          }}
          onMouseLeave={(e) => {
            e.target.style.boxShadow = "0 10px 25px rgba(30,58,138,0.4)";
            e.target.style.transform = "translateY(0)";
          }}
        >
          Login ➡️
        </button>

        <p
          style={{
            textAlign: "center",
            fontSize: "0.85rem",
            color: "#21354bff",
            marginTop: "5px",
          }}
        >
          Forgot your password?{" "}
          <span
            style={{ color: "#003c9cff", cursor: "pointer" }}
            onClick={() => alert("Password reset flow")}
          >
            Reset here
          </span>
        </p>
      </form>
    </div>
  );
};

export default StaffLogin;

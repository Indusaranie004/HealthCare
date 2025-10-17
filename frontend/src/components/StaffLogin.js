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
        background: "radial-gradient(circle at top left, #4ade80, #22d3ee, #6366f1)",
        backgroundSize: "300% 300%",
        animation: "gradientMove 15s ease infinite",
      }}
    >
      <style>
        {`
          @keyframes gradientMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>

      <form
        onSubmit={handleLogin}
        style={{
          backgroundColor: "#ffffffee",
          padding: "50px 40px",
          borderRadius: "20px",
          boxShadow: "0 20px 50px rgba(0,0,0,0.2)",
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
            fontSize: "2.2rem",
            fontWeight: "800",
            background: "linear-gradient(90deg,#22d3ee,#6366f1)",
            WebkitBackgroundClip: "text",
            color: "transparent",
            marginBottom: "10px",
          }}
        >
          Staff Login
        </h2>

        <p
          style={{
            textAlign: "center",
            color: "#6b7280",
            fontSize: "0.95rem",
            marginBottom: "20px",
          }}
        >
          Access your staff account securely
        </p>

        {error && (
          <p
            style={{
              color: "#ef4444",
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
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              padding: "15px 18px",
              borderRadius: "12px",
              border: "1px solid #cbd5e1",
              outline: "none",
              fontSize: "1rem",
              transition: "all 0.3s ease",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#22d3ee")}
            onBlur={(e) => (e.target.style.borderColor = "#cbd5e1")}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              padding: "15px 18px",
              borderRadius: "12px",
              border: "1px solid #cbd5e1",
              outline: "none",
              fontSize: "1rem",
              transition: "all 0.3s ease",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#22d3ee")}
            onBlur={(e) => (e.target.style.borderColor = "#cbd5e1")}
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
            background: "linear-gradient(90deg,#22d3ee,#6366f1)",
            color: "#fff",
            border: "none",
            transition: "all 0.3s ease",
            boxShadow: "0 8px 20px rgba(34,211,238,0.3)",
          }}
          onMouseEnter={(e) => {
            e.target.style.boxShadow = "0 12px 30px rgba(34,211,238,0.5)";
          }}
          onMouseLeave={(e) => {
            e.target.style.boxShadow = "0 8px 20px rgba(34,211,238,0.3)";
          }}
        >
          Login
        </button>

        <p
          style={{
            textAlign: "center",
            fontSize: "0.85rem",
            color: "#9ca3af",
            marginTop: "5px",
          }}
        >
          Forgot your password?{" "}
          <span
            style={{ color: "#22d3ee", cursor: "pointer" }}
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

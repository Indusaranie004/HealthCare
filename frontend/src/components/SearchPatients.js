import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";

const SearchPatients = () => {
  const [patients, setPatients] = useState([]);
  const [filters, setFilters] = useState({
    patientId: "",
    firstName: "",
    lastName: "",
    status: "",
    department: "",
    dob: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 6;

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const query = new URLSearchParams(
        Object.fromEntries(Object.entries(filters).filter(([_, v]) => v !== ""))
      ).toString();

      const url = query
        ? `http://localhost:8080/api/patients/search?${query}`
        : "http://localhost:8080/api/patients";

      const response = await fetch(url);
      const data = await response.json();
      setPatients(data);
      setCurrentPage(1);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchPatients();
  };

  const handleClear = () => {
    setFilters({
      patientId: "",
      firstName: "",
      lastName: "",
      status: "",
      department: "",
      dob: "",
    });
    fetchPatients();
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = patients.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(patients.length / rowsPerPage);

  // ---- Styles ----
  const pageStyle = {
    display: "flex",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#f7f9fc",
    minHeight: "100vh",
  };

  const contentStyle = {
    flex: 1,
    marginLeft: "220px",
    padding: "40px",
  };

  const topNavbarStyle = {
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
  };

  const logoStyle = { fontWeight: "bold", fontSize: "20px" };
  const profileStyle = {
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
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: "0",
    marginTop: "20px",
    boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
    borderRadius: "12px",
    overflow: "hidden",
    fontSize: "14px",
    backgroundColor: "#fff",
  };

  const thStyle = {
    padding: "12px 15px",
    backgroundColor: "#2c81f4",
    color: "#fff",
    textAlign: "left",
    fontWeight: "600",
    textTransform: "uppercase",
    fontSize: "13px",
  };

  const tdStyle = {
    padding: "12px 15px",
    borderBottom: "1px solid #f0f0f0",
    color: "#333",
  };

  const inputStyle = {
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none",
    fontSize: "14px",
    transition: "0.2s",
  };

  const buttonStyle = {
    padding: "10px 18px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "14px",
    transition: "0.3s",
  };

  const searchButtonStyle = { ...buttonStyle, backgroundColor: "#2c81f4", color: "#fff" };
  const clearButtonStyle = { ...buttonStyle, backgroundColor: "#f44336", color: "#fff" };

  const paginationButtonStyle = {
    padding: "6px 14px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    cursor: "pointer",
    backgroundColor: "#f5f5f5",
    fontWeight: "600",
    transition: "0.2s",
  };

  return (
    <div style={pageStyle}>
      <Sidebar />
      <div style={contentStyle}>
        {/* Top Navbar */}
        <div style={topNavbarStyle}>
          <div style={logoStyle}>HealthCare</div>
          <div style={profileStyle}>D</div>
        </div>

        {/* Page Title */}
        <h1 style={{ color: "#2c81f4", marginBottom: "30px" }}>Patient Search</h1>

        {/* Filter Form */}
        <form
          onSubmit={handleSearch}
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            marginBottom: "25px",
            alignItems: "center",
          }}
        >
          <input type="text" name="patientId" placeholder="Patient ID" value={filters.patientId} onChange={handleFilterChange} style={inputStyle} />
          <input type="text" name="firstName" placeholder="First Name" value={filters.firstName} onChange={handleFilterChange} style={inputStyle} />
          <input type="text" name="lastName" placeholder="Last Name" value={filters.lastName} onChange={handleFilterChange} style={inputStyle} />
          <input type="text" name="status" placeholder="Status" value={filters.status} onChange={handleFilterChange} style={inputStyle} />
          <input type="text" name="department" placeholder="Department" value={filters.department} onChange={handleFilterChange} style={inputStyle} />
          <input type="date" name="dob" placeholder="DOB" value={filters.dob} onChange={handleFilterChange} style={inputStyle} />
          <button type="submit" style={searchButtonStyle}>Search</button>
          <button type="button" onClick={handleClear} style={clearButtonStyle}>Clear</button>
        </form>

        {/* Patients Table */}
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>First Name</th>
              <th style={thStyle}>Last Name</th>
              <th style={thStyle}>DOB</th>
              <th style={thStyle}>Gender</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Department</th>
              <th style={thStyle}>Contact</th>
              <th style={thStyle}>Insurance</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.length > 0 ? (
              currentRows.map((p) => (
                <tr key={p.patientId} style={{ transition: "0.2s", cursor: "default", backgroundColor: "#fff" }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f1f8ff")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#fff")}
                >
                  <td style={tdStyle}>{p.patientId}</td>
                  <td style={tdStyle}>{p.firstName}</td>
                  <td style={tdStyle}>{p.lastName}</td>
                  <td style={tdStyle}>{p.dob}</td>
                  <td style={tdStyle}>{p.gender}</td>
                  <td style={tdStyle}>{p.status}</td>
                  <td style={tdStyle}>{p.department}</td>
                  <td style={tdStyle}>{p.contactNumber}</td>
                  <td style={tdStyle}>{p.insuranceProvider}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" style={{ textAlign: "center", padding: "25px", color: "#999" }}>
                  No patients found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        {patients.length > rowsPerPage && (
          <div style={{ marginTop: "25px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <button
              style={paginationButtonStyle}
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                style={{
                  ...paginationButtonStyle,
                  backgroundColor: currentPage === i + 1 ? "#2c81f4" : "#f5f5f5",
                  color: currentPage === i + 1 ? "#fff" : "#000",
                }}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              style={paginationButtonStyle}
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPatients;

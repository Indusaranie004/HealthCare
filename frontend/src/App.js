// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import BookAppointment from './pages/BookAppointment';
import ViewAppointments from './pages/ViewAppointments';
import RescheduleAppointment from './pages/RescheduleAppointment';
import CancelAppointment from './pages/CancelAppointment';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navbar with Logo */}
        <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#1E88E5' }}>
          <div className="container">
            {/* ✅ LOGO REPLACES TEXT */}
            <Link className="navbar-brand" to="/">
              <img
                src="/logo.png"
                alt="Smart Healthcare Logo"
                height="90"
                className="d-inline-block align-text-top"
              />
            </Link>
            <div className="ms-auto">
              <Link className="nav-link text-white" to="/appointments">My Appointments</Link>
            </div>
          </div>
        </nav>

        {/* Rest of code remains unchanged */}
        <div className="container mt-4">
          <Routes>
            <Route
              path="/"
              element={
                <div className="text-center mt-5">
                  <h2>Welcome to Smart Healthcare</h2>
                  <p>Manage your hospital appointments online.</p>
                  <Link
                    to="/book"
                    className="btn btn-primary mb-3"
                    style={{ backgroundColor: '#1E88E5', borderColor: '#1E88E5', color: 'white' }}
                  >
                    Book an Appointment
                  </Link>
                  <br />
                  <Link
                    to="/appointments"
                    className="btn btn-primary"
                    style={{ backgroundColor: '#1E88E5', borderColor: '#1E88E5', color: 'white' }}
                  >
                    My Appointments
                  </Link>
                </div>
              }
            />
            <Route path="/book" element={<BookAppointment />} />
            <Route path="/appointments" element={<ViewAppointments />} />
            <Route path="/reschedule/:id" element={<RescheduleAppointment />} />
            <Route path="/cancel/:id" element={<CancelAppointment />} />
          </Routes>
        </div>

        <footer className="bg-light text-center py-3 mt-5">
          <small>© 2025 Smart Healthcare System – For Urban Hospitals in Sri Lanka</small>
        </footer>
      </div>
    </Router>
  );
}

export default App;
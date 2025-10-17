// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import BookAppointment from './pages/BookAppointment';
import ViewAppointments from './pages/ViewAppointments';
import RescheduleAppointment from './pages/RescheduleAppointment';
import CancelAppointment from './pages/CancelAppointment';

function App() {
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  const addNotification = (message) => {
    const newNotification = {
      id: Date.now(),
      message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: false
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const clearNotifications = () => {
    setNotifications([]);
    setShowNotifications(false);
  };

  return (
    <Router>
      <div className="App">
        {/* Navbar with Logo, Text, and Notification Bell */}
        <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#1E88E5' }}>
          <div className="container">
            {/* Logo + Text */}
            <Link className="navbar-brand d-flex align-items-center" to="/">
              <img
                src="/logo.png"
                alt="Smart Healthcare Logo"
                height="50"
                className="me-2"
              />
              <span className="text-white fw-bold">SmartHealth</span>
            </Link>

            {/* Notification Bell + My Appointments */}
            <div className="d-flex align-items-center">
              {/* Notification Bell */}
              <div className="position-relative me-3">
                <button
                  className="btn btn-link text-white position-relative p-0"
                  onClick={() => setShowNotifications(!showNotifications)}
                  style={{ fontSize: '1.5rem' }}
                >
                  <i className="fas fa-bell"></i>
                  {notifications.length > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {notifications.length}
                    </span>
                  )}
                </button>

                {/* Notification Dropdown */}
                {showNotifications && (
                  <div
                    className="position-absolute top-100 end-0 bg-white border shadow mt-1"
                    style={{ width: '300px', zIndex: 1000 }}
                    onMouseLeave={() => setShowNotifications(false)}
                  >
                    <div className="p-2 border-bottom d-flex justify-content-between align-items-center">
                      <strong>Notifications</strong>
                      {notifications.length > 0 && (
                        <button
                          className="btn btn-sm btn-link text-danger p-0"
                          onClick={clearNotifications}
                        >
                          Clear all
                        </button>
                      )}
                    </div>
                    {notifications.length === 0 ? (
                      <div className="p-3 text-muted">No new notifications</div>
                    ) : (
                      <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                        {notifications.map((note) => (
                          <div key={note.id} className="p-3 border-bottom">
                            <div>{note.message}</div>
                            <small className="text-muted">{note.time}</small>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* My Appointments Link */}
              <Link className="nav-link text-white" to="/appointments">
                My Appointments
              </Link>
            </div>
          </div>
        </nav>

        {/* Routes */}
        <div className="container mt-4">
          <Routes>
            <Route
              path="/"
              element={
                <div className="text-center mt-5">
                  <h2>Welcome to SmartHealth</h2>
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
            <Route path="/book" element={<BookAppointment onNotify={addNotification} />} />
            <Route path="/appointments" element={<ViewAppointments />} />
            <Route path="/reschedule/:id" element={<RescheduleAppointment onNotify={addNotification} />} />
            <Route path="/cancel/:id" element={<CancelAppointment onNotify={addNotification} />} />
          </Routes>
        </div>

        <footer className="bg-light text-center py-3 mt-5">
          <small>© 2025 SmartHealth – Urban Hospital Appointment System</small>
        </footer>
      </div>
    </Router>
  );
}

export default App;
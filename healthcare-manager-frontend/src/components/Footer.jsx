// src/components/Footer.jsx
import React from 'react';

function Footer() {
  return (
    <footer style={{
      background: 'linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%)',
      color: '#e0e7ff',
      textAlign: 'center',
      padding: '1.5rem',
      position: 'fixed',
      bottom: 0,
      width: '100%',
      boxShadow: '0 -4px 12px rgba(30, 58, 138, 0.2)',
      fontSize: '0.9rem',
      fontWeight: '500',
      letterSpacing: '0.5px',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        © 2025 <span style={{ color: '#60a5fa', fontWeight: '700' }}>Healthcare Management System</span> | All Rights Reserved
      </div>
    </footer>
  );
}

export default Footer;
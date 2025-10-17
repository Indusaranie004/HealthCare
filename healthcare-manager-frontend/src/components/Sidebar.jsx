// src/components/Sidebar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Sidebar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/add-hospital', label: 'Add Hospital', icon: '🏥' },
    { path: '/generate-reports', label: 'Generate Reports', icon: '📋' },
  ];

  return (
    <aside style={{
      width: '220px',
      background: 'linear-gradient(180deg, #0f172a 0%, #1e3a8a 100%)',
      color: 'white',
      height: '100vh',
      position: 'fixed',
      top: 0,
      left: 0,
      padding: '2rem 0',
      boxShadow: '4px 0 20px rgba(30, 58, 138, 0.2)',
      overflowY: 'auto',
    }}>
      <div style={{ paddingLeft: '1.5rem', marginBottom: '2.5rem' }}>
        <h2 style={{ 
          margin: 0, 
          fontSize: '1.3rem', 
          fontWeight: '700',
          color: '#93c5fd',
          letterSpacing: '1px',
        }}>
          MENU
        </h2>
      </div>
      <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
        {menuItems.map((item) => (
          <li key={item.path}>
            <Link 
              to={item.path} 
              style={{
                color: isActive(item.path) ? '#ffffff' : '#cbd5e1',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1rem 1.5rem',
                borderLeft: isActive(item.path) ? '4px solid #3b82f6' : '4px solid transparent',
                backgroundColor: isActive(item.path) ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
                transition: 'all 0.3s ease',
                fontWeight: isActive(item.path) ? '600' : '500',
                fontSize: '0.95rem',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                if (!isActive(item.path)) {
                  e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.08)';
                  e.currentTarget.style.color = '#e0e7ff';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive(item.path)) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#cbd5e1';
                }
              }}
            >
              <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
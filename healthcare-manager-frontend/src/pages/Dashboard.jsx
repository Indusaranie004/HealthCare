// src/pages/Dashboard.jsx
import React from 'react';

function Dashboard() {
  const statCards = [
    { title: 'Patient Visits', value: '142', change: '+12%', icon: '👥', color: '#3b82f6' },
    { title: 'Service Utilization', value: '78%', change: 'Normal', icon: '📊', color: '#06b6d4' },
    { title: 'Peak Hours', value: '9:00 AM', change: 'Highest traffic', icon: '⏰', color: '#8b5cf6' },
  ];

  return (
    <div style={{ marginLeft: '220px', marginTop: '70px', marginBottom: '100px', padding: '2rem' }}>
      {/* Welcome Section */}
      <div style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '700', color: '#1e3a8a', margin: 0 }}>
          Welcome, Healthcare Manager! 👋
        </h1>
        <p style={{ color: '#64748b', marginTop: '0.5rem', fontSize: '1rem' }}>
          Your dashboard overview for today
        </p>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        {statCards.map((card, idx) => (
          <div
            key={idx}
            style={{
              background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
              border: '2px solid #e2e8f0',
              padding: '1.5rem',
              borderRadius: '12px',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 10px 25px rgba(59, 130, 246, 0.1)';
              e.currentTarget.style.transform = 'translateY(-4px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
              <div>
                <p style={{ color: '#64748b', fontSize: '0.9rem', fontWeight: '500', margin: 0 }}>
                  {card.title}
                </p>
                <p style={{ fontSize: '2.2rem', fontWeight: '700', color: '#1e3a8a', margin: '0.5rem 0 0 0' }}>
                  {card.value}
                </p>
                <p style={{ color: '#10b981', fontSize: '0.85rem', fontWeight: '600', margin: '0.5rem 0 0 0' }}>
                  {card.change}
                </p>
              </div>
              <span style={{ fontSize: '2.5rem', opacity: 0.8 }}>{card.icon}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <div
          style={{
            background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
            border: '2px solid #e2e8f0',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
          }}
        >
          <h3 style={{ color: '#1e3a8a', fontWeight: '600', marginTop: 0 }}>📈 Patient Visits Trend</h3>
          <div
            style={{
              backgroundColor: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
              height: '220px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '8px',
              color: '#1e40af',
              fontWeight: '600',
              fontSize: '0.95rem',
            }}
          >
            [Chart: Patient Visits Trend]
          </div>
        </div>

        <div
          style={{
            background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
            border: '2px solid #e2e8f0',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
          }}
        >
          <h3 style={{ color: '#1e3a8a', fontWeight: '600', marginTop: 0 }}>🔄 Service Utilization</h3>
          <div
            style={{
              backgroundColor: 'linear-gradient(135deg, #cffafe 0%, #a5f3fc 100%)',
              height: '220px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '8px',
              color: '#164e63',
              fontWeight: '600',
              fontSize: '0.95rem',
            }}
          >
            [Chart: Service Utilization Pie Chart]
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
        <button
          onClick={() => window.location.href = '/generate-reports'}
          style={{
            padding: '0.75rem 1.5rem',
            background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '0.95rem',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 6px 20px rgba(59, 130, 246, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)';
          }}
        >
          📊 Generate Reports
        </button>
        <button
          onClick={() => window.location.href = '/add-hospital'}
          style={{
            padding: '0.75rem 1.5rem',
            background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '0.95rem',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 12px rgba(6, 182, 212, 0.3)',
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 6px 20px rgba(6, 182, 212, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 12px rgba(6, 182, 212, 0.3)';
          }}
        >
          🏥 Add Hospital
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
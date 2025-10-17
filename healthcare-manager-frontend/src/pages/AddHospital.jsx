// src/pages/AddHospital.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { hospitalService } from '../services/api';

function AddHospital() {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    type: 'Government',
    serviceIds: [],
  });

  const [services, setServices] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await hospitalService.getServices();
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleServiceChange = (e) => {
    const { value, checked } = e.target;
    const serviceId = Number(value);

    if (checked) {
      setFormData(prev => ({
        ...prev,
        serviceIds: [...prev.serviceIds, serviceId],
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        serviceIds: prev.serviceIds.filter(id => id !== serviceId),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await hospitalService.addHospital(formData);
      setSubmitted(true);
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (error) {
      alert('Error adding hospital: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div style={{ marginLeft: '220px', marginTop: '70px', marginBottom: '100px', padding: '2rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '700', color: '#1e3a8a', margin: 0 }}>
          🏥 Add New Hospital
        </h1>
        <p style={{ color: '#64748b', marginTop: '0.5rem' }}>Register a new healthcare facility</p>
      </div>

      <form onSubmit={handleSubmit} style={{ maxWidth: '700px' }}>
        <div
          style={{
            background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
            border: '2px solid #e2e8f0',
            padding: '2rem',
            borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
          }}
        >
          {/* Hospital Name */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', color: '#1e3a8a', fontWeight: '600', marginBottom: '0.5rem' }}>
              Hospital Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter hospital name"
              style={{
                width: '100%',
                padding: '0.75rem',
                marginTop: '0.5rem',
                border: '2px solid #cbd5e1',
                borderRadius: '8px',
                fontSize: '0.95rem',
                transition: 'all 0.3s ease',
                boxSizing: 'border-box',
              }}
              onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
              onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
            />
          </div>

          {/* Location */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', color: '#1e3a8a', fontWeight: '600', marginBottom: '0.5rem' }}>
              Location *
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              placeholder="Enter hospital location"
              style={{
                width: '100%',
                padding: '0.75rem',
                marginTop: '0.5rem',
                border: '2px solid #cbd5e1',
                borderRadius: '8px',
                fontSize: '0.95rem',
                transition: 'all 0.3s ease',
                boxSizing: 'border-box',
              }}
              onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
              onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
            />
          </div>

          {/* Hospital Type */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', color: '#1e3a8a', fontWeight: '600', marginBottom: '0.5rem' }}>
              Hospital Type *
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '0.75rem',
                marginTop: '0.5rem',
                border: '2px solid #cbd5e1',
                borderRadius: '8px',
                fontSize: '0.95rem',
                transition: 'all 0.3s ease',
                boxSizing: 'border-box',
                backgroundColor: 'white',
              }}
              onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
              onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
            >
              <option value="Government">Government</option>
              <option value="Private">Private</option>
            </select>
          </div>

          {/* Services */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', color: '#1e3a8a', fontWeight: '600', marginBottom: '0.5rem' }}>
              Services *
            </label>
            <div
              style={{
                maxHeight: '220px',
                overflowY: 'auto',
                border: '2px solid #cbd5e1',
                padding: '1rem',
                marginTop: '0.5rem',
                borderRadius: '8px',
                backgroundColor: 'white',
              }}
            >
              {services.map(service => (
                <div key={service.id} style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'center' }}>
                  <input
                    type="checkbox"
                    id={`service-${service.id}`}
                    value={service.id}
                    onChange={handleServiceChange}
                    checked={formData.serviceIds.includes(service.id)}
                    style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: '#3b82f6' }}
                  />
                  <label
                    htmlFor={`service-${service.id}`}
                    style={{
                      marginLeft: '0.75rem',
                      color: '#334155',
                      fontWeight: '500',
                      cursor: 'pointer',
                    }}
                  >
                    {service.name}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
            <button
              type="submit"
              disabled={submitted}
              style={{
                flex: 1,
                padding: '0.75rem',
                background: submitted
                  ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                  : 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: submitted ? 'default' : 'pointer',
                fontWeight: '600',
                fontSize: '0.95rem',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
              }}
              onMouseEnter={(e) => {
                if (!submitted) {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 20px rgba(59, 130, 246, 0.4)';
                }
              }}
              onMouseLeave={(e) => {
                if (!submitted) {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)';
                }
              }}
            >
              {submitted ? '✓ Hospital Added!' : '+ Submit'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              style={{
                padding: '0.75rem 1.5rem',
                background: '#f1f5f9',
                color: '#1e3a8a',
                border: '2px solid #cbd5e1',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '0.95rem',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#e2e8f0';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#f1f5f9';
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddHospital;
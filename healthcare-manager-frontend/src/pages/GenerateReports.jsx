// src/pages/GenerateReports.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { reportService } from '../services/api';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function GenerateReports() {
  const [selectedReport, setSelectedReport] = useState('');
  const [filters, setFilters] = useState({
    hospitalType: '',
    startDate: '',
    endDate: '',
    services: [],
    insuranceType: '',
  });
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const reportRef = useRef();

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleServiceChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFilters((prev) => ({
        ...prev,
        services: [...prev.services, value],
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        services: prev.services.filter((s) => s !== value),
      }));
    }
  };

  const generateReport = async () => {
    setLoading(true);
    setError('');
    setReportData(null);

    try {
      let data;
      switch (selectedReport) {
        case 'patient':
          data = await reportService.getPatientReport(1);
          break;
        case 'finance':
          data = await reportService.getFinanceReport(1);
          break;
        case 'peakTime':
          data = await reportService.getPeakTimeReport(1);
          break;
        default:
          throw new Error('Invalid report type');
      }
      setReportData(data);
    } catch (err) {
      setError('Failed to generate report: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const barChartData = {
    labels:
      reportData && selectedReport === 'patient'
        ? reportData.map((p) => p.patientName)
        : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Patient Visits',
        data:
          reportData && selectedReport === 'patient'
            ? reportData.map((p) => 1)
            : [80, 150, 180, 170, 160, 90, 70],
        backgroundColor: 'rgba(59, 130, 246, 0.7)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 2,
        borderRadius: 6,
      },
    ],
  };

  const lineChartData = {
    labels:
      reportData && selectedReport === 'finance'
        ? ['Revenue']
        : ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'User Engagement',
        data:
          reportData && selectedReport === 'finance'
            ? [reportData.totalRevenue]
            : [65, 59, 80, 81],
        fill: false,
        borderColor: 'rgb(6, 182, 212)',
        backgroundColor: 'rgba(6, 182, 212, 0.1)',
        tension: 0.4,
        borderWidth: 3,
      },
    ],
  };

  const handleDownloadPDF = async () => {
    if (!reportRef.current) return;
    await new Promise((resolve) => setTimeout(resolve, 300));

    const element = reportRef.current;
    const canvas = await html2canvas(element, {
      useCORS: true,
      scale: 2,
      logging: false,
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const imgWidth = 210;
    const pageHeight = 297;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    const fileName = `report-${selectedReport || 'general'}-${new Date()
      .toISOString()
      .slice(0, 10)}.pdf`;
    pdf.save(fileName);
  };

  const inputStyle = {
    padding: '0.75rem',
    border: '2px solid #cbd5e1',
    borderRadius: '8px',
    fontSize: '0.95rem',
    transition: 'all 0.3s ease',
    backgroundColor: 'white',
  };

  const buttonBase = {
    padding: '0.75rem 1.5rem',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '0.95rem',
    transition: 'all 0.3s ease',
  };

  return (
    <div style={{ marginLeft: '220px', marginTop: '70px', marginBottom: '100px', padding: '2rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '700', color: '#1e3a8a', margin: 0 }}>
          Generate Reports
        </h1>
        <p style={{ color: '#64748b', marginTop: '0.5rem' }}>
          Create and export healthcare analytics
        </p>
      </div>

      {/* Report Type Selection */}
      <div
        style={{
          background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
          border: '2px solid #e2e8f0',
          padding: '1.5rem',
          borderRadius: '12px',
          marginBottom: '2rem',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
        }}
      >
        <label style={{ display: 'block', color: '#1e3a8a', fontWeight: '600', marginBottom: '0.5rem' }}>
          Select Report Type
        </label>
        <select
          value={selectedReport}
          onChange={(e) => setSelectedReport(e.target.value)}
          style={{
            ...inputStyle,
            width: '100%',
            marginTop: '0.5rem',
          }}
          onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
          onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
        >
          <option value="">-- Select Report Type --</option>
          <option value="patient">Patient Report</option>
          <option value="finance">Finance Report</option>
          <option value="peakTime">Peak Time Report</option>
        </select>
      </div>

      {/* Filters Section */}
      <div
        style={{
          background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
          border: '2px solid #e2e8f0',
          padding: '1.5rem',
          borderRadius: '12px',
          marginBottom: '2rem',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
        }}
      >
        <h3 style={{ color: '#1e3a8a', fontWeight: '600', marginTop: 0 }}>Filters</h3>

        {/* First Row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', color: '#1e3a8a', fontWeight: '600', marginBottom: '0.5rem' }}>
              Hospital Type
            </label>
            <input
              type="text"
              name="hospitalType"
              value={filters.hospitalType}
              onChange={handleFilterChange}
              placeholder="e.g., Government or Private"
              style={{
                ...inputStyle,
                width: '100%',
              }}
              onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
              onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
            />
          </div>
          <div>
            <label style={{ display: 'block', color: '#1e3a8a', fontWeight: '600', marginBottom: '0.5rem' }}>
              Date Range
            </label>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <input
                type="date"
                name="startDate"
                value={filters.startDate}
                onChange={handleFilterChange}
                style={{
                  ...inputStyle,
                  flex: 1,
                }}
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
              />
              <input
                type="date"
                name="endDate"
                value={filters.endDate}
                onChange={handleFilterChange}
                style={{
                  ...inputStyle,
                  flex: 1,
                }}
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
              />
            </div>
          </div>
        </div>

        {/* Second Row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', color: '#1e3a8a', fontWeight: '600', marginBottom: '0.5rem' }}>
              Services
            </label>
            <div
              style={{
                maxHeight: '140px',
                overflowY: 'auto',
                border: '2px solid #cbd5e1',
                padding: '1rem',
                borderRadius: '8px',
                backgroundColor: 'white',
              }}
            >
              {['General Consultation', 'Cardiology', 'Pediatrics'].map((service, i) => (
                <div key={i} style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'center' }}>
                  <input
                    type="checkbox"
                    id={`service${i}`}
                    value={i + 1}
                    onChange={handleServiceChange}
                    style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: '#3b82f6' }}
                  />
                  <label
                    htmlFor={`service${i}`}
                    style={{
                      marginLeft: '0.75rem',
                      color: '#334155',
                      fontWeight: '500',
                      cursor: 'pointer',
                    }}
                  >
                    {service}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div>
            <label style={{ display: 'block', color: '#1e3a8a', fontWeight: '600', marginBottom: '0.5rem' }}>
              Insurance Type
            </label>
            <input
              type="text"
              name="insuranceType"
              value={filters.insuranceType}
              onChange={handleFilterChange}
              placeholder="e.g., Private, Government"
              style={{
                ...inputStyle,
                width: '100%',
              }}
              onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
              onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button
            onClick={() =>
              setFilters({
                hospitalType: '',
                startDate: '',
                endDate: '',
                services: [],
                insuranceType: '',
              })
            }
            style={{
              ...buttonBase,
              background: '#f1f5f9',
              color: '#1e3a8a',
              border: '2px solid #cbd5e1',
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#e2e8f0'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#f1f5f9'}
          >
            Reset Filters
          </button>
          <button
            onClick={generateReport}
            disabled={!selectedReport || loading}
            style={{
              ...buttonBase,
              background: selectedReport && !loading ? 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)' : '#cbd5e1',
              color: 'white',
              opacity: selectedReport && !loading ? 1 : 0.6,
              boxShadow: selectedReport && !loading ? '0 4px 12px rgba(59, 130, 246, 0.3)' : 'none',
            }}
            onMouseEnter={(e) => {
              if (selectedReport && !loading) {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(59, 130, 246, 0.4)';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedReport && !loading) {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)';
              }
            }}
          >
            {loading ? 'Generating...' : 'Generate Report'}
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div
          style={{
            background: '#fee2e2',
            border: '2px solid #fca5a5',
            color: '#dc2626',
            padding: '1rem',
            borderRadius: '8px',
            marginBottom: '1.5rem',
            fontWeight: '500',
          }}
        >
          {error}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div
          style={{
            background: '#dbeafe',
            border: '2px solid #93c5fd',
            color: '#1e40af',
            padding: '1rem',
            borderRadius: '8px',
            marginBottom: '1.5rem',
            fontWeight: '500',
            textAlign: 'center',
          }}
        >
          Loading report data...
        </div>
      )}

      {/* Report Preview */}
      {reportData && (
        <div ref={reportRef}>
          <h2 style={{ color: '#1e3a8a', fontWeight: '700', marginBottom: '1.5rem' }}>Report Preview</h2>

          {/* Charts Section */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
            {(selectedReport === 'patient' || selectedReport === 'finance') && (
              <div
                style={{
                  background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                  border: '2px solid #e2e8f0',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                }}
              >
                <h3 style={{ color: '#1e3a8a', fontWeight: '600', marginTop: 0 }}>
                  {selectedReport === 'patient' ? 'Patient Visits' : 'Revenue'}
                </h3>
                <Bar data={barChartData} />
              </div>
            )}

            {(selectedReport === 'patient' || selectedReport === 'finance') && (
              <div
                style={{
                  background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                  border: '2px solid #e2e8f0',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                }}
              >
                <h3 style={{ color: '#1e3a8a', fontWeight: '600', marginTop: 0 }}>Engagement Trend</h3>
                <Line data={lineChartData} />
              </div>
            )}

            {selectedReport === 'peakTime' && (
              <div
                style={{
                  background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                  border: '2px solid #e2e8f0',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                }}
              >
                <h3 style={{ color: '#1e3a8a', fontWeight: '600', marginTop: 0 }}>Peak Hours</h3>
                <Bar data={barChartData} />
              </div>
            )}
          </div>

          {/* Data Table */}
          <div
            style={{
              background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
              border: '2px solid #e2e8f0',
              padding: '1.5rem',
              borderRadius: '12px',
              marginBottom: '2rem',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
            }}
          >
            <h3 style={{ color: '#1e3a8a', fontWeight: '600', marginTop: 0 }}>Data Table Preview</h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#dbeafe', borderBottom: '3px solid #3b82f6' }}>
                    <th style={{ border: '1px solid #cbd5e1', padding: '1rem', textAlign: 'left', color: '#1e3a8a', fontWeight: '600' }}>
                      Patient ID
                    </th>
                    <th style={{ border: '1px solid #cbd5e1', padding: '1rem', textAlign: 'left', color: '#1e3a8a', fontWeight: '600' }}>
                      Name
                    </th>
                    <th style={{ border: '1px solid #cbd5e1', padding: '1rem', textAlign: 'left', color: '#1e3a8a', fontWeight: '600' }}>
                      Last Visit
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {reportData && selectedReport === 'patient' ? (
                    reportData.map((p, index) => (
                      <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f8fafc' : 'white' }}>
                        <td style={{ border: '1px solid #cbd5e1', padding: '1rem', color: '#334155' }}>
                          {p.patientId}
                        </td>
                        <td style={{ border: '1px solid #cbd5e1', padding: '1rem', color: '#334155' }}>
                          {p.patientName}
                        </td>
                        <td style={{ border: '1px solid #cbd5e1', padding: '1rem', color: '#334155' }}>
                          {p.lastVisit}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr style={{ backgroundColor: '#f8fafc' }}>
                      <td style={{ border: '1px solid #cbd5e1', padding: '1rem', color: '#334155' }}>1</td>
                      <td style={{ border: '1px solid #cbd5e1', padding: '1rem', color: '#334155' }}>John Doe</td>
                      <td style={{ border: '1px solid #cbd5e1', padding: '1rem', color: '#334155' }}>2025-10-15</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Additional Info */}
          <div
            style={{
              background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
              border: '2px solid #93c5fd',
              padding: '1.5rem',
              borderRadius: '12px',
              marginBottom: '2rem',
              color: '#1e40af',
            }}
          >
            <h4 style={{ marginTop: 0, fontWeight: '600' }}>Additional Report Content</h4>
            <p style={{ margin: 0 }}>
              This section can contain any additional information or notes related to the report.
            </p>
          </div>

          {/* Export Buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
            <button
              onClick={handleDownloadPDF}
              style={{
                ...buttonBase,
                background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
                color: 'white',
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
              Download PDF
            </button>
            <button
              style={{
                ...buttonBase,
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: 'white',
                boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(16, 185, 129, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.3)';
              }}
            >
              Export CSV
            </button>
            <button
              style={{
                ...buttonBase,
                background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
                color: 'white',
                boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(139, 92, 246, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 12px rgba(139, 92, 246, 0.3)';
              }}
            >
              Print
            </button>
          </div>

          {/* Share Buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            <button
              style={{
                ...buttonBase,
                background: '#f1f5f9',
                color: '#1e3a8a',
                border: '2px solid #cbd5e1',
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#e2e8f0'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#f1f5f9'}
            >
              Share to Dashboard
            </button>
            <button
              style={{
                ...buttonBase,
                background: '#f1f5f9',
                color: '#1e3a8a',
                border: '2px solid #cbd5e1',
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#e2e8f0'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#f1f5f9'}
            >
              Share via Email
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default GenerateReports;
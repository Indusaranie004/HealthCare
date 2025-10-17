import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/UnsettledBills.css';

function UnsettledBills() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bills, setBills] = useState([]);

  useEffect(() => {
    let isMounted = true;
    async function loadBills() {
      setLoading(true);
      setError(null);
      try {
        const patientId = localStorage.getItem('patientId');
        if (!patientId) {
          navigate('/login');
          return;
        }

        const url = `http://localhost:8080/api/bills/patient/${encodeURIComponent(patientId)}/unsettled`;
        const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
        const text = await res.text();
        let data;
        try { data = text ? JSON.parse(text) : null; } catch (_) { data = null; }

        if (!res.ok) {
          throw new Error(data?.message || text || `HTTP ${res.status}`);
        }

        if (!isMounted) return;
        setBills(Array.isArray(data) ? data : []);
      } catch (err) {
        if (!isMounted) return;
        setError(err.message || 'Failed to load bills');
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadBills();
    return () => {
      isMounted = false;
    };
  }, [navigate]);

  const totalAmount = (bills || []).reduce((sum, b) => sum + (Number(b?.amount) || 0), 0);

  if (loading) {
    return (
      <div className="unsettled-bills-container">
        <div className="bills-header">
          <h2>Unsettled Bills</h2>
        </div>
        <p>Loading…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="unsettled-bills-container">
        <div className="bills-header">
          <h2>Unsettled Bills</h2>
        </div>
        <p className="error">{error}</p>
      </div>
    );
  }

  return (
    <div className="unsettled-bills-container">
      <div className="bills-header">
        <h2>Unsettled Bills</h2>
        <div className="bills-summary">
          <span className="badge-count">{bills?.length ?? 0}</span>
          <span className="summary-text">unpaid</span>
          <span className="spacer">•</span>
          <span className="summary-total">Total: {totalAmount.toLocaleString()}</span>
        </div>
      </div>

      {(!bills || bills.length === 0) ? (
        <p>No bills to display.</p>
      ) : (
        <ul className="bill-list">
          {bills.map((bill, index) => {
            const id = bill?.billId ?? bill?.id ?? index;
            const amount = bill?.amount != null ? Number(bill.amount).toLocaleString() : '—';
            const issuedAt = bill?.issuedAt ? new Date(bill.issuedAt).toLocaleDateString() : '—';
            const hospital = bill?.hospitalName || '—';
            const location = bill?.hospitalLocation || '';
            return (
              <li key={id} className="bill-item">
                <div className="bill-card">
                  <div className="bill-left">
                    <div className="bill-id">#{id}</div>
                    <div className="bill-date">{issuedAt}</div>
                  </div>
                  <div className="bill-center">
                    <div className="bill-hospital">{hospital}</div>
                    <div className="bill-location">{location}</div>
                  </div>
                  <div className="bill-right">
                    <div className="bill-amount">{amount}</div>
                    <div className="bill-status">Unpaid</div>
                    <button className="btn-primary" onClick={() => navigate(`/settle/${id}`)}>Settle</button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default UnsettledBills;


